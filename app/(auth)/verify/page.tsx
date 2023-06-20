'use client'

import { toast } from "@/components/ui/use-toast";
import VerifyCard from "@/components/verify/verifyCard";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { AuthRequiredError } from "@/lib/exceptions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verify() {
    const Router = useRouter();
    const { data: user, error, isLoading } = useGetSessionUser();
    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    )
    if (error) {
        throw new AuthRequiredError;
    }


    if (user?.data.is_verified) {
        toast({
            title: "Already Verified 🥳",
            description: "You are already verified",
        })
        Router.push('/')
    }
    return (
        <div className="container flex items-center justify-center mt-10">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-center text-green-500 lg:text-2xl">Verify your account</h1>
                <p className="text-xs text-gray-400 sm:text-base">You need to verify your account to create projects</p>
                <div className="flex flex-row items-center justify-center w-full">
                    <VerifyCard
                        username={user?.data.username!} email={user?.data.email!} />
                </div>
            </div>
        </div>
    )
}