// app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Login DB
import { prismaApp } from '@/lib/prismaApp' // ✅ Trading DB
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, birthDate, idCard } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (!firstName || !lastName || !birthDate || !idCard) {
      return NextResponse.json(
        { error: 'Please fill all personal information' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    if (age < 20) {
      return NextResponse.json(
        { error: 'You must be at least 20 years old to register' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const existingIdCard = await prismaApp.user.findUnique({
      where: { idCard }
    })

    if (existingIdCard) {
      return NextResponse.json(
        { error: 'ID Card already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const loginUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: `${firstName}`,
        role: 'USER'
      }
    })

    await prismaApp.user.create({
      data: {
        id: loginUser.id,
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        idCard,
      }
    })

    await prismaApp.bankAccount.createMany({
      data: [
        {
          userId: loginUser.id,
          country: 'THAILAND',
          currency: 'THB',
          balance: 0
        },
        {
          userId: loginUser.id,
          country: 'USA',
          currency: 'USD',
          balance: 0
        },
        {
          userId: loginUser.id,
          country: 'THAILAND',
          currency: 'USD',
          balance: 0
         }
      ]
    })

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        userId: loginUser.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
