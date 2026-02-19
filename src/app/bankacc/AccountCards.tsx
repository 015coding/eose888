'use client'

import { Box, Card, CardContent, Typography } from "@mui/material"
import { Prisma } from '@/lib/generated/prismaApp'

type BankAccount = Prisma.BankAccountGetPayload<object>
type Props = {
  accounts: BankAccount[]
}

export default function AccountCards({ accounts }: Props) {
  return (
    <Box
      display="flex-col"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        {accounts.map((account) => (
          <Card key={account.id} sx={{ minWidth: 200 }}>
            <CardContent>
              <Typography variant="h6">{account.currency}</Typography>
              <Typography variant="body1">
                ${Number(account.balance).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {account.country}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}