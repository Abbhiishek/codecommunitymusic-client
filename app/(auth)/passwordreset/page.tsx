'use client'

import VerifyCard from "@/components/passwordreset/verfiyCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import * as z from 'zod'

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
})



export default function Verify() {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [enable, setEnable] = useState<boolean>(false)
    return (
        <div className="container flex items-center justify-center min-h-screen mt-10">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 border-green-400 border-dashed rounded-md shadow-md border-3">
                <h1 className="text-lg font-bold text-center text-green-500 lg:text-2xl">Reset your password</h1>
                <p className="text-xs text-gray-400 sm:text-base">Enter your email and we&apos;ll send you a OTP to reset your password</p>
                <div className="flex flex-col items-center justify-start w-full">
                    <Label
                        className="text-sm font-bold text-gray-500"
                    >
                        Email address
                    </Label>
                    <Input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email address"
                        value={email}

                        onChange={(event) => {
                            setEmail(event.target.value)
                            const result = schema.safeParse(
                                { email: email }
                            )
                            if (!result.success) {
                                setError(result.error.issues[0].message)
                                setEnable(false)
                            } else {
                                setError('')
                                setEnable(true)
                            }
                        }}
                    />
                </div>
                <span>
                    <span className="text-xs font-bold text-red-500 text-start">{error}</span>
                </span>
                <VerifyCard
                    enable={enable}
                    email={email}
                />
            </div>
        </div >
    )
}