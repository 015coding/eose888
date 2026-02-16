// app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { prismaApp } from '@/lib/prismaApp'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const totalUsers = await prisma.user.count()

    const totalTransactions = await prismaApp.transactionStock.count()

    const holdings = await prismaApp.holding.findMany({
      select: {
        quantity: true,
        avgCost: true,
      }
    })
    
    const totalPortfolioValue = holdings.reduce((sum, holding) => {
      return sum + (Number(holding.quantity) * Number(holding.avgCost))
    }, 0)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const transactions = await prismaApp.transactionStock.findMany({
      where: {
        tradeDate: {
          gte: sevenDaysAgo
        }
      },
      select: {
        tradeDate: true
      }
    })

    const trendMap = new Map<string, number>()
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      trendMap.set(dateStr, 0)
    }

    transactions.forEach(t => {
      const dateStr = t.tradeDate.toISOString().split('T')[0]
      if (trendMap.has(dateStr)) {
        trendMap.set(dateStr, (trendMap.get(dateStr) || 0) + 1)
      }
    })

    const transactionTrend = Array.from(trendMap.entries()).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count
    }))

    // ✅ 5. Top Stocks (5 อันดับแรก)
    const stockTransactions = await prismaApp.transactionStock.groupBy({
      by: ['stockId'],
      _count: {
        stockId: true
      },
      orderBy: {
        _count: {
          stockId: 'desc'
        }
      },
      take: 5
    })

    const topStocks = stockTransactions.map(st => ({
      name: st.stockId,
      value: st._count.stockId
    }))

    const recentTransactionsData = await prismaApp.transactionStock.findMany({
      take: 10,
      orderBy: {
        tradeDate: 'desc'
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    const recentTransactions = recentTransactionsData.map(t => ({
      id: t.id.toString(),
      userName: `${t.user.firstName} ${t.user.lastName}`,
      stockId: t.stockId,
      type: t.type,
      quantity: Number(t.quantity),
      price: Number(t.price),
      tradeDate: t.tradeDate.toISOString(),
    }))

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTransactions,
        totalPortfolioValue: Math.round(totalPortfolioValue),
      },
      transactionTrend,
      topStocks,
      recentTransactions,
    })

  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
