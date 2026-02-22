import { NextRequest, NextResponse } from 'next/server'
import { loginLogger } from '@/lib/loginLogger'

export async function POST(req: NextRequest) {
  try {
    const { action, email, userId, name, success, errorMessage } =
      await req.json()

    if (action === 'login') {
      await loginLogger.logLogin(email, success, userId, name, errorMessage)
    } else if (action === 'logout') {
      await loginLogger.logLogout(userId, email, name)
    } else if (action === 'register') {
      await loginLogger.logRegister(email, userId, name)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Log error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}