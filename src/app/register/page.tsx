'use client'

import { useState } from 'react'
import { TextField, Button, Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from "next/navigation"

export default function Register() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleHome = () => {
        router.push('/')
    }

    const handleLogin = () => {
        router.push('/login')
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill all fields')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            setSuccess(true)
            
            setTimeout(() => {
                router.push('/login')
            }, 2000)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleRegister} className="flex flex-col gap-4 w-3/4 max-w-md">
                    <p 
                        className="text-emerald-500 font-bold text-4xl cursor-pointer" 
                        onClick={handleHome}
                    >
                        eose888
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-700">Create Account</h2>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">Account created! Redirecting to login...</Alert>}

                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        fullWidth 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />

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

                    <TextField 
                        label="Confirm Password" 
                        variant="outlined" 
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                        

                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <span 
                            className="text-emerald-500 cursor-pointer hover:underline"
                            onClick={handleLogin}
                        >
                            Login here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}