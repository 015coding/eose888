import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectMongoDB from '@/lib/mongodb'
import LoginLog from '@/models/LoginLog'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  // เฉพาะ Admin
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
    const limit = parseInt(searchParams.get('limit') || '100')

    const query: any = {}
    if (userId) query.userId = userId
    if (email) query.userEmail = email
    if (action) query.action = action
    if (success !== null && success !== '') query.success = success === 'true'

    const logs = await LoginLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json(logs)
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}