"use client"

import { UserData } from "@/types/User";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";


const passwordSchema = z.object({
    new_password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }).max(50),
    confirm_password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }).max(50),
})

function Account(
    { user }: { user: UserData }
) {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [Visiblity, setVisiblity] = useState(user.data.is_public)



    useEffect(() => {

        if (newPassword !== confirmPassword) {
            setError("Password does not match")
        } else {
            setError("")
        }
    }, [newPassword, confirmPassword])

    const handleVisiblityChange = async () => {
        try {
            const { data } = await axios.put("/api/user/visiblity", {
                body: JSON.stringify({
                    is_public: !Visiblity
                })
            })
            if (data.success) {
                setVisiblity(!Visiblity)
                toast({
                    title: "Success",
                    description: data.message,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlepasswordChange = async () => {
        try {
            const result = passwordSchema.safeParse({
                new_password: newPassword,
                confirm_password: confirmPassword
            })
            if (!result.success) {
                setError(result.error.errors[0].message);
                toast({
                    title: "Error",
                    description: result.error.errors[0].message,
                })

            } else {
                // console.log(result.data);
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/changepassword/${user.data.email}`, {
                    password: confirmPassword
                })
                if (res.status === 200) {
                    toast({
                        title: "Success",
                        description: "Password changed successfully",
                    })
                    setNewPassword("")
                    setConfirmPassword("")
                }

            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="relative flex flex-col gap-3">
            <h1 className="text-lg font-extrabold">Account details</h1>
            <span>
                <span className="font-semibold">Your Username:</span>
                <span className="italic"> `@{user.data.username}`</span>
            </span>
            <span>
                <span className="font-semibold">Your Email:</span>
                <span className="italic"> `{user.data.email}`</span>
            </span>
            <span>
                <span className="font-semibold">Your Karma:</span>
                <span className="italic"> {user.data.karma}</span>
            </span>
            <span>
                <span className="font-semibold">Joined at:</span>
                <span className="italic"> {new Date(user.data.created_at).toLocaleDateString()}</span>
            </span>
            <Separator
                className="my-5"
            />
            <div>
                <h1 className="text-lg font-extrabold">Privacy & Visiblity</h1>
                <div className="flex flex-col justify-between gap-4">
                    <span>
                        <span className="flex items-center justify-between gap-4 font-semibold">Your profile is:
                            {
                                Visiblity ?
                                    <span className="text-green-600"> Public</span>
                                    :
                                    <span className="text-red-600"> Private</span>
                            }
                        </span>
                        <span className="pt-5">
                            {
                                Visiblity ?
                                    <span className="text-sm italic">Your profile is visible to everyone, all information will be displayed publicly so be careful what you share.</span>
                                    :
                                    <span className="text-sm italic">Your profile is visible to only you. Toggle visibility to public to showcase your profile publically.</span>
                            }
                        </span>
                    </span>
                    <Button
                        className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={handleVisiblityChange}
                        variant="outline"
                    >
                        {
                            Visiblity ?
                                "Make Private"
                                :
                                "Make Public"
                        }
                    </Button>
                </div>
            </div>
            <Separator
                className="my-5"
            />
            <div className="flex items-center justify-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
                <h1>Danger Zone</h1>
            </div>
            <div className="flex flex-col gap-10 p-3 border-2 border-red-600 border-dashed rounded-lg lg:p-10">
                <h1 className="text-lg font-extrabold text-center">Change password</h1>
                <div className="flex flex-col w-full gap-3 justify-evenly lg:flex-row">
                    <div className="w-full">
                        <Label className="font-semibold" htmlFor="new_password">New password</Label>
                        <Input type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                    </div>
                    <div className="w-full">
                        <Label className="font-semibold" htmlFor="confirm_password">Confirm password</Label>
                        <Input type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between sm:flex-row">
                    <span className="text-red-600"
                    >
                        {error}
                    </span>
                    <Button
                        className="px-5 py-2 text-white "
                        disabled={error !== ""}
                        onClick={handlepasswordChange}
                        variant="destructive"
                    >
                        Change password
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Account