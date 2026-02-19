'use client'

import { useState } from 'react'
import { signIn , getSession} from 'next-auth/react'
import { TextField, Button, Alert, CircularProgress, IconButton, InputAdornment, Box, Typography, Paper } from "@mui/material"
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import { useRouter } from "next/navigation"
import { logAuthEvent } from '@/lib/authLogger'

const THEME = {
    bg: '#131722',
    cardBg: '#1E222D',
    grid: '#2A2E39',
    textMain: '#D1D4DC',
    textMuted: '#787B86',
    up: '#089981',
    accent: '#2962FF',
}

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
        <Box className="flex min-h-screen w-full" sx={{ bgcolor: THEME.bg }} suppressHydrationWarning>
            {/* Left Side - Decorative Panel */}
            <Box 
                sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    width: '50%',
                    bgcolor: THEME.bg,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: THEME.textMain,
                    p: 4
                }}
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.15,
                        backgroundImage: `linear-gradient(${THEME.grid} 1px, transparent 1px), linear-gradient(90deg, ${THEME.grid} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} 
                />
                <Box 
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '100%', height: '100%', 
                        background: `radial-gradient(circle, ${THEME.accent}20 0%, transparent 70%)`, 
                        filter: 'blur(60px)', zIndex: 0
                    }} 
                />
                <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight="bold" sx={{ mb: 2, letterSpacing: '-1px' }}>
                        Trade with <span style={{ color: THEME.up }}>Confidence</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: THEME.textMuted, maxWidth: '400px', mx: 'auto' }}>
                        Access global markets with superior execution speed and professional tools.
                    </Typography>
                </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    p: 4,
                    position: 'relative'
                }}
            >
                <IconButton 
                    onClick={handleHome}
                    sx={{ position: 'absolute', top: 24, left: 24, color: THEME.textMuted, '&:hover': { color: THEME.up } }}
                >
                    <ArrowBack />
                </IconButton>

                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 3, sm: 6 }, 
                        width: '100%', 
                        bgcolor: THEME.cardBg,
                        border: `1px solid ${THEME.grid}`,
                        maxWidth: '480px',
                        borderRadius: 4,
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography 
                            variant="h4" 
                            fontWeight="800" 
                            sx={{ 
                                color: THEME.textMain, 
                                mb: 1, 
                                cursor: 'pointer',
                                letterSpacing: '-1px'
                            }}
                            onClick={handleHome}
                        >
                            Eose<span style={{ color: THEME.up }}>888</span>
                        </Typography>
                        <Typography variant="h5" fontWeight="600" sx={{ color: THEME.textMain }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, color: THEME.textMuted }}>
                            Please enter your details to sign in
                        </Typography>
                    </Box>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        {error && (
                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField 
                            label="Email Address" 
                            variant="outlined" 
                            type="email"
                            fullWidth 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            InputProps={{
                                sx: { borderRadius: 2, color: THEME.textMain },
                            }}
                            InputLabelProps={{
                                sx: { color: THEME.textMuted, '&.Mui-focused': { color: THEME.up } }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: THEME.grid },
                                    '&:hover fieldset': { borderColor: THEME.textMuted },
                                    '&.Mui-focused fieldset': { borderColor: THEME.up },
                                }
                            }}
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
                                sx: { borderRadius: 2, color: THEME.textMain },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: THEME.textMuted }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                sx: { color: THEME.textMuted, '&.Mui-focused': { color: THEME.up } }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: THEME.grid },
                                    '&:hover fieldset': { borderColor: THEME.textMuted },
                                    '&.Mui-focused fieldset': { borderColor: THEME.up },
                                }
                            }}
                        />

                        <Button 
                            type="submit"
                            variant="contained" 
                            size="large"
                            disabled={loading}
                            sx={{ 
                                bgcolor: THEME.up, 
                                color: 'white',
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: `0 4px 12px ${THEME.up}40`,
                                '&:hover': {
                                    bgcolor: '#067a65',
                                    boxShadow: `0 6px 16px ${THEME.up}60`,
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ color: THEME.textMuted }}>
                                Don't have an account?{' '}
                                <span 
                                    style={{ color: THEME.up, fontWeight: 600, cursor: 'pointer' }}
                                    className="hover:underline transition-colors"
                                    onClick={handleSignUp}
                                >
                                    Create an account
                                </span>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
}