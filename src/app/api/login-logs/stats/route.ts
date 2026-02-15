import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectMongoDB from '@/lib/mongodb'
import LoginLog from '@/models/LoginLog'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await connectMongoDB()

    const now = new Date()
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalLogins,
      successfulLogins,
      failedLogins,
      logins24h,
      logins7d,
      uniqueUsers,
      recentFailures,
    ] = await Promise.all([
      LoginLog.countDocuments({ action: 'login' }),
      LoginLog.countDocuments({ action: 'login', success: true }),
      LoginLog.countDocuments({ action: 'login',success: false }),
      LoginLog.countDocuments({ createdAt: { $gte: last24h } }),
      LoginLog.countDocuments({ createdAt: { $gte: last7d } }),
      LoginLog.distinct('userId'),
      LoginLog.find({ success: false })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
    ])

    return NextResponse.json({
      totalLogins,
      successfulLogins,
      failedLogins,
      successRate:
        totalLogins > 0
          ? Number(((successfulLogins / totalLogins) * 100).toFixed(1))
          : 0,
      logins24h,
      logins7d,
      uniqueUsers: uniqueUsers.length,
      recentFailures,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
