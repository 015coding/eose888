"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

// Mock data - In a real app, you'd calculate this from your 'logs'
const data = [
  { name: 'Mon', thb: 4000, usd: 2400 },
  { name: 'Tue', thb: 3000, usd: 1398 },
  { name: 'Wed', thb: 2000, usd: 9800 },
  { name: 'Thu', thb: 2780, usd: 3908 },
  { name: 'Fri', thb: 1890, usd: 4800 },
  { name: 'Sat', thb: 2390, usd: 3800 },
  { name: 'Sun', thb: 3490, usd: 4300 },
];

export default function FinancialGraph() {
  return (
    <Paper sx={{ 
      p: 4, 
      my: 6, // Great spacing between Cards and Transactions
      bgcolor: 'rgba(255, 255, 255, 0.02)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 6,
      border: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#000000', fontWeight: 800 }}>
          Market Performance
        </Typography>
        <Typography variant="caption" sx={{ color: '#000000' }}>
          Portfolio growth across all accounts
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#49e6b7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#49e6b7" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1f2e', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="thb" 
              stroke="#49e6b7" 
              fillOpacity={1} 
              fill="url(#colorGreen)" 
              strokeWidth={3}
            />
            <Area 
              type="monotone" 
              dataKey="usd" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorBlue)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}