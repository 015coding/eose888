'use client'

import { useState } from 'react'
import { TextField, Button, Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from "next/navigation"
import { logAuthEvent } from '@/lib/authLogger'

export default function Register() {
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [idCard, setIdCard] = useState('')
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

    const calculateAge = (birthDate: string) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        
        return age
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // Validation
        if (!firstName || !lastName || !birthDate || !idCard || !email || !password || !confirmPassword) {
            setError('Please fill all fields')
            return
        }

        const age = calculateAge(birthDate)
        if (age < 20) {
            setError('You must be at least 20 years old to register')
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
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    birthDate,
                    idCard,
                    email, 
                    password 
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            } else {
                await logAuthEvent('register', email, true, data.userId, `${firstName} ${lastName}`)
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

    const getMaxDate = () => {
        const today = new Date()
        today.setFullYear(today.getFullYear() - 20)
        return today.toISOString().split('T')[0]
    }

    return (
        <div className="flex h-screen" suppressHydrationWarning>
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

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                        <TextField 
                            label="First Name" 
                            variant="outlined" 
                            fullWidth 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={loading}
                        />
                        <TextField 
                            label="Last Name" 
                            variant="outlined" 
                            fullWidth 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* ID Card */}
                    <TextField 
                        label="ID Card / Passport Number" 
                        variant="outlined" 
                        fullWidth 
                        value={idCard}
                        onChange={(e) => setIdCard(e.target.value)}
                        disabled={loading}
                        placeholder="e.g., 1234567890123"
                    />

                    {/* Birth Date */}
                    <TextField 
                        label="Birth Date" 
                        variant="outlined" 
                        type="date"
                        fullWidth 
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        disabled={loading}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            max: getMaxDate() // ✅ จำกัดวันที่สูงสุด (20 ปีที่แล้ว)
                        }}
                        helperText="Must be at least 20 years old"
                    />

                    {/* Email */}
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        type="email"
                        fullWidth 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                    <Button 
                        type="submit"
                        variant="contained" 
                        sx={{ bgcolor: '#49e6b7' }}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>

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