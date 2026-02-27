'use client'

import { useState } from 'react'
import {
  Box, Typography, Switch, TextField, Button, InputAdornment, Stack
} from '@mui/material'
import {
  SaveRounded as SaveIcon,
  DeleteOutlineRounded as DeleteIcon,
  FileDownloadRounded as DownloadIcon,
} from '@mui/icons-material'

const T = {
  wallpaper:   '#FFFFFF',
  glass:       'rgba(255,255,255,0.60)',
  glassBorder: 'rgba(255,255,255,0.85)',
  shadow:      '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
  text:        '#374151',
  textDim:     '#9CA3AF',
  textBright:  '#111827',
  emerald:     '#10B981',
  blue:        '#3B82F6',
  red:         '#EF4444',
  mono:        '"DM Mono","JetBrains Mono",monospace',
  sans:        '"SF Pro Rounded","SF Pro Display",-apple-system,"Helvetica Neue",sans-serif',
}


function GlassCard({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  return (
    <Box sx={{
      bgcolor: T.glass,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${T.glassBorder}`,
      borderRadius: '20px',
      boxShadow: T.shadow,
      overflow: 'hidden',
      ...sx,
    }}>
      {children}
    </Box>
  )
}

function CardHead({ label, sub }: { label: string; sub?: string }) {
  return (
    <Box sx={{ px: 2.5, pt: 2.25, pb: 1.25, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textDim }}>
          {label}
        </Typography>
        {sub && <Typography sx={{ fontFamily: T.sans, fontSize: '0.7rem', color: T.textDim, mt: 0.2 }}>{sub}</Typography>}
      </Box>
    </Box>
  )
}

const IOSSwitch = ({ checked, onChange }: { checked: boolean; onChange: (e: any) => void }) => (
  <Switch
    disableRipple
    checked={checked}
    onChange={onChange}
    sx={{
      width: 46, height: 26, padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0, margin: '2px', transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(20px)', color: '#fff',
          '& + .MuiSwitch-track': { backgroundColor: T.emerald, opacity: 1, border: 0 },
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box', width: 22, height: 22,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2, backgroundColor: 'rgba(0,0,0,0.1)',
        opacity: 1, transition: 'background-color 300ms ease',
      },
    }}
  />
)

function SettingRow({ title, desc, control, isLast = false }: { title: string; desc: string; control: React.ReactNode; isLast?: boolean }) {
  return (
    <Box sx={{ 
      display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
      alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', 
      py: 2.5, px: 2.5, gap: 2, borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)' 
    }}>
      <Box sx={{ flex: 1, pr: 2 }}>
        <Typography sx={{ fontFamily: T.sans, fontSize: '0.9rem', fontWeight: 600, color: T.textBright, letterSpacing: '-0.01em', mb: 0.25 }}>
          {title}
        </Typography>
        <Typography sx={{ fontFamily: T.sans, fontSize: '0.8rem', color: T.textDim, lineHeight: 1.4 }}>
          {desc}
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0, minWidth: { xs: '100%', sm: 'auto' } }}>
        {control}
      </Box>
    </Box>
  )
}

function ActionRow({ title, desc, buttonText, onClick, icon, color = T.textBright, isLast = false }: { title: string; desc: string; buttonText: string; onClick: () => void; icon: React.ReactNode; color?: string; isLast?: boolean }) {
  return (
    <Box sx={{ 
      display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
      alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', 
      py: 2, px: 2.5, gap: 2, borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)' 
    }}>
      <Box sx={{ flex: 1, pr: 2 }}>
        <Typography sx={{ fontFamily: T.sans, fontSize: '0.9rem', fontWeight: 600, color: T.textBright, letterSpacing: '-0.01em' }}>
          {title}
        </Typography>
        <Typography sx={{ fontFamily: T.sans, fontSize: '0.8rem', color: T.textDim, mt: 0.25 }}>
          {desc}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={icon}
        onClick={onClick}
        sx={{
          flexShrink: 0, borderRadius: '10px', px: 2, py: 0.75,
          fontFamily: T.sans, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none',
          color: color, borderColor: `${color}40`,
          '&:hover': { bgcolor: `${color}10`, borderColor: color },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  )
}

const inputProps = {
  disableUnderline: true,
  sx: {
    borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.03)',
    fontFamily: T.sans, fontSize: '0.85rem', color: T.textBright,
    '&.Mui-focused': { bgcolor: 'rgba(0,0,0,0.05)' },
    '& input': { py: 1.25, px: 1.5 },
  }
}


export default function AdminSettingsPage() {
  const [telegramAlerts, setTelegramAlerts] = useState(true)
  const [suspiciousLogin, setSuspiciousLogin] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState('https://api.telegram.org/bot123456...')
  
  const [timezone, setTimezone] = useState('UTC')
  const [strictIp, setStrictIp] = useState(false)
  const [logRetention, setLogRetention] = useState('30')

  return (
    <Box sx={{ minHeight: '100vh', background: T.wallpaper, p: { xs: 2, md: 3 }, pb: { xs: 10, md: 4 } }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Box>
          <Typography sx={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.textDim, mb: 0.4 }}>
            Admin Console
          </Typography>
          <Typography sx={{ fontFamily: T.sans, fontSize: '1.25rem', fontWeight: 700, color: T.textBright, letterSpacing: '-0.04em' }}>
            Settings
          </Typography>
        </Box>
        <Button
          disableElevation
          variant="contained"
          startIcon={<SaveIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            bgcolor: T.emerald, color: '#fff', borderRadius: '12px', px: 2, py: 1,
            fontFamily: T.sans, fontSize: '0.85rem', fontWeight: 600, textTransform: 'none',
            '&:hover': { bgcolor: '#059669', transform: 'translateY(-1px)' },
            transition: 'all 0.2s ease',
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Stack spacing={4} maxWidth="800px">
        
        <GlassCard>
          <CardHead label="Display & Preferences" sub="Adjust how information is presented" />
          <Box>
            <SettingRow
              title="System Timezone"
              desc="Set the default timezone for logs and charts."
              control={
                <TextField select SelectProps={{ native: true }} variant="filled" InputProps={inputProps} sx={{ minWidth: { sm: 180 } }} value={timezone} onChange={e => setTimezone(e.target.value)}>
                  <option value="UTC">UTC (+00:00)</option>
                  <option value="Asia/Bangkok">Asia/Bangkok (+07:00)</option>
                </TextField>
              }
            />
            <SettingRow
              title="Log Retention Period"
              desc="Automatically archive authentication and transaction logs after a set period."
              control={
                <TextField select SelectProps={{ native: true }} variant="filled" InputProps={inputProps} sx={{ minWidth: { sm: 180 } }} value={logRetention} onChange={e => setLogRetention(e.target.value)}>
                  <option value="15">15 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                </TextField>
              }
              isLast
            />
          </Box>
        </GlassCard>

        <GlassCard>
          <CardHead label="Alerts & Integrations" sub="Webhook endpoints and system notifications" />
          <Box>
            <SettingRow
              title="Telegram Notifications"
              desc="Send critical system alerts directly to your Telegram admin group."
              control={<IOSSwitch checked={telegramAlerts} onChange={(e) => setTelegramAlerts(e.target.checked)} />}
            />
            <SettingRow
              title="Webhook / Bot Token URL"
              desc="The endpoint URL for triggering external integrations."
              control={
                <TextField 
                  variant="filled" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)}
                  disabled={!telegramAlerts}
                  InputProps={{
                    ...inputProps,
                    sx: { ...inputProps.sx, fontFamily: T.mono, fontSize: '0.75rem', width: { xs: '100%', sm: '260px' } }
                  }}
                />
              }
              isLast
            />
          </Box>
        </GlassCard>

        <GlassCard>
          <CardHead label="Security & Data Management" sub="Access control and system maintenance" />
          <Box>
            <SettingRow
              title="Suspicious Login Alerts"
              desc="Trigger an alert when a login attempt occurs from an unrecognized IP."
              control={<IOSSwitch checked={suspiciousLogin} onChange={(e) => setSuspiciousLogin(e.target.checked)} />}
            />
            <SettingRow
              title="Strict Admin IP Allowlist"
              desc="Restrict admin console access only to predefined IP addresses."
              control={<IOSSwitch checked={strictIp} onChange={(e) => setStrictIp(e.target.checked)} />}
            />
            <ActionRow
              title="Export User Data"
              desc="Download a full CSV dump of all registered users and their roles."
              buttonText="Export CSV"
              icon={<DownloadIcon sx={{ fontSize: 18 }} />}
              onClick={() => console.log('export')}
            />
            <ActionRow
              title="Clear System Cache"
              desc="Force refresh cached queries and temporary application data."
              buttonText="Clear Cache"
              icon={<DeleteIcon sx={{ fontSize: 18 }} />}
              color={T.red}
              onClick={() => console.log('clear cache')}
              isLast
            />
          </Box>
        </GlassCard>

      </Stack>
    </Box>
  )
}