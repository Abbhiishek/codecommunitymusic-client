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

import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, useRef, useState } from "react"
import { z } from "zod"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { toast } from "../ui/use-toast"


const VerifySchema = z.object({
    otp: z.string().min(6, {
        message: 'OTP must be 6 digits'
    }).max(6)
})



function VerifyCard({ username, email }: { username: string, email: string }) {

    const router = useRouter();

    const [otp, setOtp] = useState<string>('')
    const [retry, setRetry] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const sendOtp = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generateotp/${username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('session_token')}`
            }
        })
        if (res.status === 200) {
            toast({
                title: "Verification email sent",
                description: "Check your email to verify your account",
            })
        }

    }

    const handleVerify = async () => {
        const otpValidation = VerifySchema.safeParse({ otp: otp })
        if (!otpValidation.success) {
            setError(otpValidation.error.errors[0].message)
            return
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verifyaccount/${username}`, {
                otp
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                    }
                })
            if (res.status === 200) {
                toast({
                    title: "Great! 🥳",
                    description: "Your account has been verified",
                })
                router.push('/')
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

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (event.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
            } else {
                setOtp((prevOtp) => {
                    const newOtp = prevOtp.split('');
                    newOtp[index] = '';
                    return newOtp.join('');
                });
            }
        }
        if (event.key === 'Enter') {
            handleVerify()
        }
        if (event.key === ' ') {
            event.preventDefault()
        }
        if (event.key === 'ArrowRight') {
            inputRefs.current[index + 1]?.focus();
        }
        if (event.key === 'ArrowLeft') {
            inputRefs.current[index - 1]?.focus();
        }

    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    onClick={sendOtp}
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                >Verify your Account </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Verify your account</DialogTitle>
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
                            onKeyPress={(event) => handleKeyPress(event, index)}
                            ref={(el) => (inputRefs.current[index] = el)}

                        />
                    ))}

                </div>
                <Separator className="my-4" />
                <div>
                    <p className="text-center text-gray-100">
                        Didn&apos;t receive the email ?
                        <Button
                            variant={"link"}
                            onClick={() => setRetry(retry + 1)}
                            className="text-green-500 cursor-pointer hover:text-green-600">
                            Resend
                        </Button>

                    </p>
                </div>
                <div className="flex items-center justify-center w-full p-4 space-x-4">
                    <Button
                        variant="default"
                        className="w-full bg-green-500 hover:bg-green-600 "
                        onClick={handleVerify}>Verify 🥳</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VerifyCard