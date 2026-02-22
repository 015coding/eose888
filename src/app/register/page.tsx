'use client'

import { useState } from 'react'
import { TextField, Button, Alert, CircularProgress, IconButton, InputAdornment, Box, Typography, Paper, Container, Grid } from "@mui/material"
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import { useRouter } from "next/navigation"
import { logAuthEvent } from '@/lib/authLogger'
import { motion } from 'framer-motion'

const THEME = {
    bg: '#131722',
    cardBg: '#1E222D',
    grid: '#2A2E39',
    inputBg: '#2A2E39',
    textMain: '#D1D4DC',
    textMuted: '#787B86',
    up: '#089981',
    accent: '#2962FF',
    error: '#F23645'
}

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
            const response = await fetch('/api/users/register', {
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

    // Real-time validation
    const passwordError = password.length > 0 && password.length < 6
    const confirmPasswordError = confirmPassword.length > 0 && password !== confirmPassword

    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                bgcolor: THEME.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                py: 4
            }}
            suppressHydrationWarning
        >
            {/* Animated Background Grid */}
            <Box 
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1 }}
                sx={{
                    position: 'fixed', inset: 0,
                    backgroundImage: `linear-gradient(${THEME.grid} 1px, transparent 1px), linear-gradient(90deg, ${THEME.grid} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    zIndex: 0
                }} 
            />
            
            {/* Ambient Glow */}
             <Box 
                component={motion.div}
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                sx={{
                    position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '600px',
                    background: `radial-gradient(circle, ${THEME.up}15 0%, transparent 70%)`, 
                    filter: 'blur(80px)', zIndex: 0,
                    pointerEvents: 'none'
                }} 
            />

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    <Paper elevation={0} sx={{ 
                        p: { xs: 3, sm: 5 }, 
                        bgcolor: 'rgba(30, 34, 45, 0.75)', // Glass effect
                        backdropFilter: 'blur(20px)',
                        border: `1px solid rgba(255,255,255,0.08)`,
                        borderRadius: 4,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <IconButton 
                                onClick={handleHome}
                                size="small"
                                sx={{ 
                                    color: THEME.textMuted, 
                                    mr: 1, 
                                    border: `1px solid ${THEME.grid}`,
                                    '&:hover': { color: THEME.textMain, borderColor: THEME.textMuted } 
                                }}
                            >
                                <ArrowBack fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" fontWeight="600" color={THEME.textMuted}>
                                Back to Home
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center', mb: 5 }}>
                            <Typography 
                                variant="h4" 
                                fontWeight="800" 
                                sx={{ 
                                    color: THEME.textMain, 
                                    mb: 1, 
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Create <span style={{ color: THEME.up }}>Account</span>
                            </Typography>
                            <Typography variant="body1" color={THEME.textMuted}>
                                Join Eose888 for professional trading
                            </Typography>
                        </Box>

                        <form onSubmit={handleRegister} className="flex flex-col gap-4">
                            {error && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Alert severity="error" variant="filled" sx={{ mb: 2, bgcolor: `${THEME.error}15`, color: THEME.error, border: `1px solid ${THEME.error}30` }}>
                                        {error}
                                    </Alert>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Alert severity="success" variant="filled" sx={{ mb: 2, bgcolor: `${THEME.up}15`, color: THEME.up, border: `1px solid ${THEME.up}30` }}>
                                        Account created! Redirecting to login...
                                    </Alert>
                                </motion.div>
                            )}

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField 
                                        label="First Name" 
                                        variant="outlined" 
                                        fullWidth 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={loading}
                                        InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: THEME.inputBg,
                                                '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                                '&:hover fieldset': { borderColor: THEME.textMuted },
                                                '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                                '& input': { color: THEME.textMain }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField 
                                        label="Last Name" 
                                        variant="outlined" 
                                        fullWidth 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled={loading}
                                        InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: THEME.inputBg,
                                                '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                                '&:hover fieldset': { borderColor: THEME.textMuted },
                                                '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                                '& input': { color: THEME.textMain }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <TextField 
                                label="ID Card / Passport Number" 
                                variant="outlined" 
                                fullWidth 
                                value={idCard}
                                onChange={(e) => setIdCard(e.target.value)}
                                disabled={loading}
                                placeholder="e.g., 1234567890123"
                                InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: THEME.inputBg,
                                        '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                        '&:hover fieldset': { borderColor: THEME.textMuted },
                                        '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                        '& input': { color: THEME.textMain }
                                    }
                                }}
                            />

                            <TextField 
                                label="Birth Date" 
                                variant="outlined" 
                                type="date"
                                fullWidth 
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                disabled={loading}
                                InputLabelProps={{ shrink: true, sx: { color: THEME.textMuted } }}
                                inputProps={{
                                    max: getMaxDate()
                                }}
                                helperText="Must be at least 20 years old"
                                FormHelperTextProps={{ sx: { color: THEME.textMuted } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: THEME.inputBg,
                                        '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                        '&:hover fieldset': { borderColor: THEME.textMuted },
                                        '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                        '& input': { color: THEME.textMain, '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }
                                    }
                                }}
                            />

                            <TextField 
                                label="Email" 
                                variant="outlined" 
                                type="email"
                                fullWidth 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: THEME.inputBg,
                                        '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                        '&:hover fieldset': { borderColor: THEME.textMuted },
                                        '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                        '& input': { color: THEME.textMain }
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
                                error={passwordError}
                                helperText={passwordError ? "Password must be at least 6 characters" : ""}
                                InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                InputProps={{
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: THEME.inputBg,
                                        '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                        '&:hover fieldset': { borderColor: THEME.textMuted },
                                        '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                        '&.Mui-error fieldset': { borderColor: THEME.error },
                                        '& input': { color: THEME.textMain }
                                    }
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
                                error={confirmPasswordError}
                                helperText={confirmPasswordError ? "Passwords do not match" : ""}
                                InputLabelProps={{ sx: { color: THEME.textMuted } }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                sx={{ color: THEME.textMuted }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: THEME.inputBg,
                                        '& fieldset': { borderColor: THEME.grid, transition: 'all 0.2s' },
                                        '&:hover fieldset': { borderColor: THEME.textMuted },
                                        '&.Mui-focused fieldset': { borderColor: THEME.up, borderWidth: '1px' },
                                        '&.Mui-error fieldset': { borderColor: THEME.error },
                                        '& input': { color: THEME.textMain }
                                    }
                                }}
                            />

                            <Button 
                                type="submit"
                                variant="contained" 
                                size="large"
                                disabled={loading}
                                sx={{ 
                                    mt: 2,
                                    bgcolor: THEME.up, 
                                    color: '#fff',
                                    py: 1.8,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 20px rgba(8, 153, 129, 0.25)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        bgcolor: '#067a65',
                                        boxShadow: '0 8px 25px rgba(8, 153, 129, 0.4)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)'
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: '#067a65',
                                        color: '#ffffff',
                                        opacity: 0.8
                                    }
                                }}
                            >
                                {loading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                                        <span>Creating account...</span>
                                    </Box>
                                ) : 'Create Account'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Typography variant="body2" sx={{ color: THEME.textMuted }}>
                                    Already have an account?{' '}
                                    <span 
                                        style={{ color: THEME.up, fontWeight: 600, cursor: 'pointer' }}
                                        onClick={handleLogin}
                                    >
                                        Login here
                                    </span>
                                </Typography>
                            </Box>
                        </form>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    )
}