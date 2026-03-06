import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prismaApp } from "@/lib/prismaApp"
import { redirect } from "next/navigation"
import Navbar from '@/components/Navbar' 
import AccountCards from './AccountCards'
import TransactionList from './TransactionList'
import AccountAnalytics from "./AccountAnalytics"
import { Box, Container, Typography, Stack, Divider, Paper , Grid} from '@mui/material'

const T = {
  wallpaper:   '#F8FAFC',
  glass:       'rgba(255, 255, 255, 0.45)', // Semi-transparent
  glassBorder: 'rgba(255, 255, 255, 0.60)',
  blur:        'blur(12px)',                // The glass effect
  shadow:      '0 8px 32px rgba(0,0,0,0.05)',
  textMain:    '#1e293b',
  accent:      '#10b981',
}

export default async function BankAcc_Page() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  // --- Logic remains exactly the same ---
  const [accounts, logs] = await Promise.all([
    prismaApp.bankAccount.findMany({ where: { userId: session.user.id } }),
    prismaApp.accountLog.findMany({
      where: { account: { userId: session.user.id } },
      include: { transfer: { select: { fromAccountId: true, toAccountId: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
  ])

  const serializedAccounts = accounts.map((acc) => ({
    ...acc, balance: Number(acc.balance), createdAt: acc.createdAt.toISOString(),
  }))

  const serializedLogs = logs.map((log) => ({
    id: String(log.id),
    accountId: log.accountId,
    type: log.type,
    amount: Number(log.amount),
    balanceBefore: Number(log.balanceBefore),
    balanceAfter: Number(log.balanceAfter),
    createdAt: log.createdAt.toISOString(),
    transfer: log.transfer ? { fromAccountId: log.transfer.fromAccountId, toAccountId: log.transfer.toAccountId } : null
  }))

return (
    <Box sx={{ bgcolor: T.wallpaper, minHeight: '100vh', pb: 10 }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        
      {/* Account Cards Container in Glass */}
      <Paper elevation={0} sx={{ 
          p: 4, mb: 6, borderRadius: '32px', 
          bgcolor: T.glass, 
          backdropFilter: T.blur, 
          border: `1px solid ${T.glassBorder}`,
          boxShadow: T.shadow
        }}>
          <AccountCards accounts={serializedAccounts} />
      </Paper>

      {/* Analytics Section in Glass */}
      <Paper elevation={0} sx={{ 
        p: 4, mb: 4, borderRadius: '32px', 
        bgcolor: T.glass, 
        backdropFilter: T.blur, 
        border: `1px solid ${T.glassBorder}`,
        boxShadow: T.shadow 
      }}>
        {/* Now passing both data sets from your existing Prisma fetch */}
        <AccountAnalytics accounts={serializedAccounts} logs={serializedLogs} />
      </Paper>

        {/* History Section */}
        <Box sx={{ px: 1 }}>
            <Typography variant="h6" sx={{ color: T.textMain, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
                <Box sx={{ width: 6, height: 24, bgcolor: T.accent, borderRadius: 1 }} />
                Transaction History
            </Typography>
            <Paper elevation={0} sx={{ 
              borderRadius: '24px', overflow: 'hidden', 
              bgcolor: T.glass, 
              backdropFilter: T.blur, 
              border: `1px solid ${T.glassBorder}` 
            }}>
                <TransactionList accounts={serializedAccounts} logs={serializedLogs} />
            </Paper>
        </Box>
      </Container>
    </Box>
  )
}