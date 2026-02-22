// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import * as userService from '@/service/admin/user.service'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 100

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 1) return fallback
  return parsed
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE)
    const parsedLimit = parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT)
    const limit = Math.min(parsedLimit, MAX_LIMIT)

    const { users, totalUsers } = await userService.getUsers(page, limit)

    return NextResponse.json({
      users,
      totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Add new user
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const newUser = await userService.createUser(body)

    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// PATCH - Update user role
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, role } = await request.json()

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 400 }
      )
    }

    const updatedUser = await userService.updateUserRole(userId, role)

    return NextResponse.json({
      message: 'User role updated successfully',
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
      },
    })
  } catch (error: any) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE - delete user
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await userService.deleteUser(userId)

    return NextResponse.json({
      message: 'User deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}