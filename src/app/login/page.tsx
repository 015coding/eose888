'use client'
import { TextField , Button } from "@mui/material"
import { useRouter } from "next/navigation"



export default function Login() {
    const router = useRouter()
    const handleHome = () => {
        router.push('/')
    }


    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col gap-4 w-3/4 max-w-md">
                    <p className="text-emerald-500 font-bold text-4xl cursor-pointer" onClick={handleHome}>eose888</p>
                    <TextField label="Email" variant="outlined" fullWidth />
                    <TextField label="Password" variant="outlined" type="password" fullWidth />
                    <div className="flex gap-4 w-full justify-center">
                        <Button 
                        variant="contained" 
                        sx={{bgcolor: '#49e6b7'}}
                        className="flex-1">
                            Login
                        </Button>
                        <Button 
                        variant="outlined"
                        sx={{color: "gray" , borderColor: "gray"}} 
                        className="flex-1">Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
