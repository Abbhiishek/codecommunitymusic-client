'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { useGetSessionUser } from "@/hooks/user/get-current-user"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { z } from "zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { toast } from "../ui/use-toast"


const VerifySchema = z.object({
    otp: z.string().min(6, {
        message: 'OTP must be 6 digits'
    }).max(6)
})

const PasswordSchema = z.object({
    password: z.string().min(8, {
        message: 'Password must be atleast 8 characters'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be atleast 8 characters'
    })
})

function VerifyCard({ email, enable }: { email: string, enable: boolean }) {
    const router = useRouter()
    const { refetch } = useGetSessionUser()

    const [otp, setOtp] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [newpassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [otpverified, setOtpVerified] = useState<boolean>(false)

    useEffect(() => {
        if (newpassword != confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }

    }, [newpassword, confirmPassword])


    const sendOtp = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/forgetpassword/${email}`)
        if (res.status === 200) {
            toast({
                title: "Verification email sent",
                description: "Check your email to verify your account",
            })
        }
        else if (res.status === 404) {
            toast({
                title: "Something went wrong",
                description: "Check your email",
            })
        }

    }
    const handlePasswordChange = async () => {

        const passwordValidation = PasswordSchema.safeParse({ password: newpassword, confirmPassword: confirmPassword })
        if (!passwordValidation.success) {
            setPasswordError(passwordValidation.error.errors[0].message)
            return
        }
        if (passwordValidation.data.password !== passwordValidation.data.confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        if (passwordValidation.data.password === passwordValidation.data.confirmPassword) {
            setPasswordError('')
        }
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/changepassword/${email}`, {
                password: confirmPassword
            })
            if (res.status === 200) {
                toast({
                    title: "Password changed",
                    description: "Your password has been changed",
                })
                setLoading(false)
                setOtpVerified(false)
                setOtp('')
                setNewPassword('')
                setConfirmPassword('')
                refetch()
                router.push('/login')
            }
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data?.message);
            toast({
                title: "Try again",
                description: error?.response?.data?.message,
            })
            setLoading(false)

        }
    }

    const handleVerify = async () => {
        const otpValidation = VerifySchema.safeParse({ otp: otp })
        if (!otpValidation.success) {
            setError(otpValidation.error.errors[0].message)
            return
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/forgetpassword/${email}`, {
                otp
            })
            if (res.status === 200) {
                toast({
                    title: "OTP verified",
                    description: "Your otp has been verified",
                })
                setOtpVerified(true)
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                console.log(error);
                setError(error.response.data.slug);
                toast({
                    title: "Try again",
                    description: error.response.data.message,
                })
                setLoading(false)
            }

        }
    }

    const handleOtpChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const value: string = event.target.value;
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            setOtp((prevOtp) => {
                const newOtp = prevOtp.split('');
                newOtp[index] = value;
                const joinedOtp = newOtp.join('');
                if (index < inputRefs.current.length - 1 && value !== '') {
                    inputRefs.current[index + 1]?.focus();
                }
                return joinedOtp;
            });
        }
    };



    return (
        <Dialog>
            <DialogTrigger
                disabled={!enable}
            >
                <Button
                    onClick={sendOtp}
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                    disabled={!enable}
                >
                    Reset Password
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Reset your password</DialogTitle>
                    <DialogDescription>
                        Enter one-Time password sent to your email address:  <span
                            className="italic text-gray-100">
                            {email}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-4" />
                <span
                    className="italic text-center text-red-600"
                >{error}</span>
                {/* six single digit boxes where i can store number  */}
                <div className="flex items-center justify-center w-full gap-2 lg:space-x-4">

                    {Array.from({ length: 6 }).map((_, index) => (
                        <Input
                            key={index}
                            type="text"
                            className="text-center text-black bg-gray-100 outline-none lg:text-4xl md:w-12 md:h-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={otp[index] || ''}
                            onChange={(event) => handleOtpChange(event, index)}
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}

                        />
                    ))}

                </div>
                <div>
                    <p className="text-center text-gray-100">
                        Didn&apos;t receive the email ?
                        <Button
                            variant={"link"}
                            onClick={sendOtp}
                            className="text-green-500 cursor-pointer hover:text-green-600">
                            Resend
                        </Button>
                    </p>
                </div>
                <div className="flex items-center justify-center w-full px-4 space-x-4">
                    {loading && <Loader2 className="w-6 h-6 text-green-500" />}
                    <Button
                        variant="default"
                        className="w-full bg-green-500 hover:bg-green-600 "
                        onClick={handleVerify}>Verify 🥳</Button>
                </div>
                <Separator className="" />
                <div className="flex justify-between gap-4">
                    <div>
                        <Label>
                            <span className="text-gray-100">New Password</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter your new password"
                            className="w-full"
                            value={newpassword}
                            disabled={!otpverified}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            <span className="text-gray-100">Confirm Password</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Confirm your new password"
                            className="w-full"
                            value={confirmPassword}
                            disabled={!otpverified}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <span className="text-sm font-black text-red-800">
                    {passwordError}
                </span>
                <Separator className="my-4" />
                <div className="flex items-center justify-center w-full px-4 space-x-4">
                    {loading && <Loader2 className="w-6 h-6 text-green-500" />}
                    <Button
                        variant="ghost"
                        disabled={!otpverified}
                        className="w-full "
                        onClick={handlePasswordChange}>Change Password 🔑</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default VerifyCard