"use client";

import React, { useState } from "react";
import { 
  Box, Typography, Button, Paper, Grid, Stack, TextField, InputAdornment 
} from "@mui/material";

const themeColor = {
  primary: '#10b981',
  secondary: '#1e293b',
};

interface TradePanelProps {
  symbol: string;
  currentPrice?: number;
}

export default function TradePanel({ symbol, currentPrice = 156.50 }: TradePanelProps) {
  // สถานะประเภทคำสั่งซื้อ (Market / Limit)
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  
  // สถานะโหมดการกรอกข้อมูล (ระบุเป็นหุ้น / ระบุเป็นเงิน)
  const [inputMode, setInputMode] = useState<'SHARES' | 'CASH'>('SHARES');
  
  // สถานะข้อมูลที่กรอก
  const [inputValue, setInputValue] = useState(''); // ใช้ตัวแปรเดียวเก็บค่าทั้งหุ้นและเงิน
  const [limitPrice, setLimitPrice] = useState('');

  // ราคากลางที่ใช้คำนวณ (ถ้าราคาตลาดก็ใช้ currentPrice, ถ้า Limit ก็ใช้ค่าที่กรอก)
  const activePrice = orderType === 'MARKET' ? currentPrice : (parseFloat(limitPrice) || 0);
  const parsedInput = parseFloat(inputValue) || 0;

  // คำนวณมูลค่ารวม (Estimated Cost)
  const getEstimatedCost = () => {
    if (inputMode === 'CASH') return parsedInput; // ถ้ากรอกเป็นเงิน ค่าใช้จ่ายก็คือเงินที่กรอก
    return parsedInput * activePrice; // ถ้ากรอกเป็นหุ้น เอาจำนวนหุ้นคูณราคา
  };

  // คำนวณจำนวนหุ้นที่ได้ (Estimated Shares)
  const getEstimatedShares = () => {
    if (inputMode === 'SHARES') return parsedInput; // ถ้ากรอกเป็นหุ้น ก็ได้หุ้นตามนั้น
    if (activePrice > 0) return parsedInput / activePrice; // ถ้ากรอกเป็นเงิน เอาเงินหารราคา
    return 0;
  };

  // สไตล์สำหรับ TextField (Dark Mode)
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
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        Trade {symbol}
      </Typography>

      {/* --- 1. ตัวเลือกประเภท Order (Market / Limit) --- */}
      <Stack direction="row" spacing={1} sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 0.5, borderRadius: 3, mb: 3 }}>
        <Button
          fullWidth
          onClick={() => setOrderType('MARKET')}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 700,
            color: orderType === 'MARKET' ? '#fff' : 'rgba(255,255,255,0.5)',
            bgcolor: orderType === 'MARKET' ? 'rgba(255,255,255,0.1)' : 'transparent',
            '&:hover': { bgcolor: orderType === 'MARKET' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)' }
          }}
        >
          ซื้อทันที (Market)
        </Button>
        <Button
          fullWidth
          onClick={() => setOrderType('LIMIT')}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 700,
            color: orderType === 'LIMIT' ? '#fff' : 'rgba(255,255,255,0.5)',
            bgcolor: orderType === 'LIMIT' ? 'rgba(255,255,255,0.1)' : 'transparent',
            '&:hover': { bgcolor: orderType === 'LIMIT' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)' }
          }}
        >
          ตั้งราคา (Limit)
        </Button>
      </Stack>

      <Stack spacing={2.5} sx={{ mb: 4 }}>
        
        {/* --- 2. ช่องกรอกจำนวน (พร้อมตัวเลือกสลับ หุ้น / เงิน) --- */}
        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1} px={0.5}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              ระบุตาม:
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Typography 
                variant="caption" 
                onClick={() => { setInputMode('SHARES'); setInputValue(''); }}
                sx={{ 
                  cursor: 'pointer', 
                  color: inputMode === 'SHARES' ? themeColor.primary : 'rgba(255,255,255,0.5)',
                  fontWeight: inputMode === 'SHARES' ? 800 : 500,
                  transition: '0.2s'
                }}
              >
                จำนวนหุ้น
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)' }}>|</Typography>
              <Typography 
                variant="caption" 
                onClick={() => { setInputMode('CASH'); setInputValue(''); }}
                sx={{ 
                  cursor: 'pointer', 
                  color: inputMode === 'CASH' ? themeColor.primary : 'rgba(255,255,255,0.5)',
                  fontWeight: inputMode === 'CASH' ? 800 : 500,
                  transition: '0.2s'
                }}
              >
                จำนวนเงิน (USD)
              </Typography>
            </Stack>
          </Stack>

          <TextField
            label={inputMode === 'SHARES' ? "ระบุจำนวนหุ้น (Shares)" : "ระบุจำนวนเงิน (USD)"}
            type="number"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
        
        {/* --- 3. ช่องกรอกราคาต่อหุ้น --- */}
        <TextField
          label="ราคาต่อหุ้น (Price)"
          type="number"
          fullWidth
          value={orderType === 'MARKET' ? currentPrice : limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          disabled={orderType === 'MARKET'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>$</Typography>
              </InputAdornment>
            ),
          }}
          sx={{
            ...darkInputStyle,
            '& .Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.7) !important' }
          }}
        />
      </Stack>
      
      {/* --- 4. ปุ่มกด ยืนยันคำสั่งซื้อ/ขาย --- */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              py: 2, borderRadius: 4, bgcolor: themeColor.primary, 
              fontWeight: 900, fontSize: '1.1rem',
              boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4)',
              '&:hover': { bgcolor: '#059669', transform: 'translateY(-2px)', boxShadow: '0 12px 20px -4px rgba(16, 185, 129, 0.5)' },
              transition: '0.2s'
            }}
          >
            BUY
          </Button>
        </Grid>
        <Grid size={6}>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ 
              py: 2, borderRadius: 4, color: '#fff', borderColor: 'rgba(255,255,255,0.2)', 
              fontWeight: 900, fontSize: '1.1rem',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)', transform: 'translateY(-2px)' },
              transition: '0.2s'
            }}
          >
            SELL
          </Button>
        </Grid>
      </Grid>

      {/* --- 5. แสดงสรุปราคา / หุ้น แบบ Dynamic --- */}
      <Box sx={{ mt: 4, p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)' }}>
        {inputMode === 'SHARES' ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Estimated Cost</Typography>
            <Typography variant="h6" fontWeight={800} color={themeColor.primary}>
              ${getEstimatedCost().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Estimated Shares</Typography>
            <Typography variant="h6" fontWeight={800} color={themeColor.primary}>
              {getEstimatedShares().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
            </Typography>
          </Stack>
        )}
      </Box>
    </Paper>
  );
}