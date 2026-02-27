import { getAllTransactionsLog } from '@/service/user/user.service'
import { NextResponse } from 'next/server'

const parseLocalDate = (value: string | null, endOfDay: boolean): Date | undefined => {
  if (!value) return undefined
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return undefined
  if (endOfDay) return new Date(y, m - 1, d, 23, 59, 59, 999)
  return new Date(y, m - 1, d, 0, 0, 0, 0)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const all = searchParams.get('all') === 'true'
  const startDate = parseLocalDate(searchParams.get('startDate'), false)
  const endDate = parseLocalDate(searchParams.get('endDate'), true)
  const search = (searchParams.get('search') || '').trim()
  const type = (searchParams.get('type') || 'ALL').trim().toUpperCase()

  if (!all && startDate && endDate && startDate.getTime() > endDate.getTime()) {
    return NextResponse.json({ error: 'Invalid date range' }, { status: 400 })
  }

  try {
    const transactions = await getAllTransactionsLog(page, limit, {
      all,
      startDate,
      endDate,
      search,
      type,
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Admin transactions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
