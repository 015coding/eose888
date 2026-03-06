import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectMongoDB from '@/lib/mongodb'
import LoginLog from '@/models/LoginLog'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const LIMIT_OPTIONS = [5, 10, 25] as const

function parsePage(value: string | null) {
  if (!value) return DEFAULT_PAGE
  const page = Number.parseInt(value, 10)
  if (Number.isNaN(page) || page < 1) return DEFAULT_PAGE
  return page
}

function parseLimit(value: string | null) {
  if (!value) return DEFAULT_LIMIT
  const limit = Number.parseInt(value, 10)
  if (
    Number.isNaN(limit) ||
    !LIMIT_OPTIONS.includes(limit as (typeof LIMIT_OPTIONS)[number])
  ) {
    return DEFAULT_LIMIT
  }
  return limit
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  try {
    await connectMongoDB()
    
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')
    const action = searchParams.get('action')
    const success = searchParams.get('success')
    const page = parsePage(searchParams.get('page'))
    const limit = parseLimit(searchParams.get('limit'))
    const skip = (page - 1) * limit

    const query: any = {}

    if (userId) query.userId = userId
    
    if (email) {
      query.userEmail = { 
        $regex: email, 
        $options: 'i' 
      }
    }
    
    if (action) query.action = action
    if (success !== null && success !== '') query.success = success === 'true'
    const [logs, totalLogs] = await Promise.all([
      LoginLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      LoginLog.countDocuments(query),
    ])

    return NextResponse.json({
      logs,
      page,
      limit,
      totalLogs,
      totalPages: Math.max(1, Math.ceil(totalLogs / limit)),
    })
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}