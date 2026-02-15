'use client'

import { useState } from 'react'
import { signIn , getSession} from 'next-auth/react'
import { TextField, Button, Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from "next/navigation"
import { logAuthEvent } from '@/lib/authLogger'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleHome = () => {
        router.push('/')
    }

    const handleSignUp = () => {
        router.push('/register')
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email || !password) {
            setError('Please fill all fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                console.log('Login error:', result.error)
                await logAuthEvent('login', email, false, undefined, undefined, result.error || 'Invalid Credentials')

                setError('Invalid email or password')
            } else {
                await logAuthEvent('login', email, true)
                const session = await getSession()
                if (session?.user?.role === 'ADMIN') {
                    router.push('/admin/dashboard')
                } else{
                    router.push('/dashboard')
                }

            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen" suppressHydrationWarning> 
            <div className="flex-1 bg-white flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-3/4 max-w-md">
                    <p 
                        className="text-emerald-500 font-bold text-4xl cursor-pointer" 
                        onClick={handleHome}
                    >
                        eose888
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-700">Welcome Back</h2>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        type="email"
                        fullWidth 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <TextField 
                        label="Password" 
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'}
                        fullWidth 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <div className="flex gap-4 w-full justify-center">
                        <Button 
                            type="submit"
                            variant="contained" 
                            sx={{ bgcolor: '#49e6b7' }}
                            className="flex-1"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                        

                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <span 
                            className="text-emerald-500 cursor-pointer hover:underline"
                            onClick={handleSignUp}
                        >
                            Sign up here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}