"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, Paper, Grid, Stack, TextField, 
  InputAdornment, Alert, CircularProgress, Select, MenuItem, FormControl
} from "@mui/material";

const themeColor = {
  primary: '#10b981',
  secondary: '#1e293b',
};

interface TradePanelProps {
  symbol: string;
  currentPrice?: number;
  onTradeSuccess?: () => void;
}

type USDAccount = {
  id: string;
  country: string;
  balance: number;
};

export default function TradePanel({ symbol, currentPrice = 0, onTradeSuccess }: TradePanelProps) {
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [inputMode, setInputMode] = useState<'SHARES' | 'CASH'>('SHARES');
  const [inputValue, setInputValue] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usdAccounts, setUsdAccounts] = useState<USDAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const fetchAccounts = () => {
    fetch('/api/bank-accounts/accounts')
      .then(r => r.json())
      .then((data: { id: string; country: string; currency: string; balance: number }[]) => {
        const usd = data.filter(a => a.currency === 'USD');
        setUsdAccounts(usd);
        if (usd.length > 0 && !selectedAccountId) setSelectedAccountId(usd[0].id);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const activePrice = orderType === 'MARKET' ? currentPrice : (parseFloat(limitPrice) || 0);
  const parsedInput = parseFloat(inputValue) || 0;

  const getEstimatedCost = () => {
    if (inputMode === 'CASH') return parsedInput;
    return parsedInput * activePrice;
  };

  const getEstimatedShares = () => {
    if (inputMode === 'SHARES') return parsedInput;
    if (activePrice > 0) return parsedInput / activePrice;
    return 0;
  };

  const selectedAccount = usdAccounts.find(a => a.id === selectedAccountId);

  const handleBuy = async () => {
    setError('');
    setSuccess('');

    const shares = getEstimatedShares();
    const price = activePrice;

    if (!symbol) return setError('ไม่พบ symbol');
    if (shares <= 0) return setError('กรุณาระบุจำนวนที่ถูกต้อง');
    if (price <= 0) return setError('กรุณาระบุราคา');
    if (!selectedAccountId) return setError('กรุณาเลือกบัญชี USD');

    setLoading(true);
    try {
      const endpoint = orderType === 'MARKET'
        ? '/api/buying-stock/market-order'
        : '/api/buying-stock/limit-order';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockId: symbol, quantity: shares, price, accountId: selectedAccountId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'ซื้อไม่สำเร็จ');

      setSuccess(orderType === 'MARKET' ? 'ซื้อสำเร็จเรียบร้อย!' : 'วาง Limit Order สำเร็จ! รอราคาถึงเป้าหมาย');
      onTradeSuccess?.();
      setInputValue('');
      setLimitPrice('');
      fetchAccounts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

const handleSell = async () => {
    setError('');
    setSuccess('');

    const shares = getEstimatedShares();
    const price = activePrice;

    if (!symbol) return setError('ไม่พบ symbol');
    if (shares <= 0) return setError('กรุณาระบุจำนวนที่ถูกต้อง');
    if (price <= 0) return setError('กรุณาระบุราคา');
    if (!selectedAccountId) return setError('กรุณาเลือกบัญชี USD');

    setLoading(true);
    try {
      if (orderType === 'LIMIT') {
        const res = await fetch('/api/buying-stock/limit-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockId: symbol, quantity: shares, price, type: 'SELL', accountId: selectedAccountId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'วาง order ไม่สำเร็จ');
        setSuccess('วาง Limit Sell Order สำเร็จ! รอราคาถึงเป้าหมาย');
      } else {
        const res = await fetch('/api/buying-stock/market-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockId: symbol, quantity: shares, price, type: 'SELL', accountId: selectedAccountId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'ขายไม่สำเร็จ');
        setSuccess('ขายสำเร็จเรียบร้อย!');
      }

      onTradeSuccess?.();
      setInputValue('');
      setLimitPrice('');
      fetchAccounts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const darkInputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      borderRadius: 3,
      bgcolor: 'rgba(255,255,255,0.05)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: themeColor.primary },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
    '& .MuiInputLabel-root.Mui-focused': { color: themeColor.primary },
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 6, bgcolor: themeColor.secondary, color: '#fff', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
        Trade {symbol}
      </Typography>

      {/* Order Type */}
      <Stack direction="row" spacing={1} sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 0.5, borderRadius: 3, mb: 3 }}>
        {(['MARKET', 'LIMIT'] as const).map(type => (
          <Button key={type} fullWidth onClick={() => setOrderType(type)} sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 700,
            color: orderType === type ? '#fff' : 'rgba(255,255,255,0.5)',
            bgcolor: orderType === type ? 'rgba(255,255,255,0.1)' : 'transparent',
            '&:hover': { bgcolor: orderType === type ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)' }
          }}>
            {type === 'MARKET' ? 'ซื้อทันที (Market)' : 'ตั้งราคา (Limit)'}
          </Button>
        ))}
      </Stack>

      <Stack spacing={2.5} sx={{ mb: 3 }}>

        {/* เลือกบัญชี USD */}
        <Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            บัญชี USD ที่ใช้ซื้อขาย
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedAccountId}
              onChange={e => setSelectedAccountId(e.target.value)}
              sx={{
                color: 'white', borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
              }}
            >
              {usdAccounts.map(a => (
                <MenuItem key={a.id} value={a.id}>
                  <Box>
                    <Typography variant="body2" fontWeight={800}>{a.country}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      คงเหลือ: ${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedAccount && (
            <Typography variant="caption" sx={{ color: themeColor.primary, fontWeight: 700, mt: 0.5, display: 'block' }}>
              ยอดคงเหลือ: ${selectedAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          )}
        </Box>

        {/* Input Mode */}
        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1} px={0.5}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>ระบุตาม:</Typography>
            <Stack direction="row" spacing={1.5}>
              {(['SHARES', 'CASH'] as const).map(mode => (
                <Typography key={mode} variant="caption"
                  onClick={() => { setInputMode(mode); setInputValue(''); }}
                  sx={{ cursor: 'pointer', color: inputMode === mode ? themeColor.primary : 'rgba(255,255,255,0.5)', fontWeight: inputMode === mode ? 800 : 500, transition: '0.2s' }}
                >
                  {mode === 'SHARES' ? 'จำนวนหุ้น' : 'จำนวนเงิน (USD)'}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <TextField
            label={inputMode === 'SHARES' ? "ระบุจำนวนหุ้น" : "ระบุจำนวนเงิน (USD)"}
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value)) setInputValue(e.target.value); }}
            InputProps={{
              startAdornment: inputMode === 'CASH' ? (
                <InputAdornment position="start">
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>$</Typography>
                </InputAdornment>
              ) : null,
            }}
            sx={darkInputStyle}
          />
        </Box>

        {/* ราคาต่อหุ้น */}
        <TextField
          label="ราคาต่อหุ้น (Price)"
          type="text"
          fullWidth
          value={orderType === 'MARKET' ? currentPrice : limitPrice}
          onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value)) setLimitPrice(e.target.value); }}
          disabled={orderType === 'MARKET'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>$</Typography>
              </InputAdornment>
            ),
          }}
          sx={{ ...darkInputStyle, '& .Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.7) !important' } }}
        />
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>{success}</Alert>}

      {/* BUY / SELL */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <Button fullWidth variant="contained" onClick={handleBuy} disabled={loading}
            sx={{
              py: 2, borderRadius: 4, bgcolor: themeColor.primary, fontWeight: 900, fontSize: '1.1rem',
              boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4)',
              '&:hover': { bgcolor: '#059669', transform: 'translateY(-2px)' }, transition: '0.2s'
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'BUY'}
          </Button>
        </Grid>
        <Grid size={6}>
          <Button fullWidth variant="outlined" onClick={handleSell} disabled={loading}
            sx={{
              py: 2, borderRadius: 4, color: '#fff', borderColor: 'rgba(255,255,255,0.2)', fontWeight: 900, fontSize: '1.1rem',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)', transform: 'translateY(-2px)' }, transition: '0.2s'
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'SELL'}
          </Button>
        </Grid>
      </Grid>

      {/* Estimated */}
      <Box sx={{ mt: 4, p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {inputMode === 'SHARES' ? 'Estimated Cost' : 'Estimated Shares'}
          </Typography>
          <Typography variant="h6" fontWeight={800} color={themeColor.primary}>
            {inputMode === 'SHARES'
              ? `$${getEstimatedCost().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : getEstimatedShares().toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}