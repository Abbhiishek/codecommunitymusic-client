'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";


const error = ({
    error,
    reset
}: {
    error: Error;
    reset: () => void
}) => {

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <h4>Something Went Wrong 🥲</h4>
            <h1 className="inline font-mono font-bold text-red-600 lg:text-6xl">{error.message || "You are not Authorised"}</h1>
            <p className="text-gray-500">Please try again later</p>
            <div className="flex items-center justify-center gap-5 mt-4">
                <Button
                    variant={"outline"}
                    onClick={reset}
                >Retry</Button>
                <Link href='/' legacyBehavior>
                    <Button

                        className="bg-green-700"
                        variant={"secondary"}
                        onClick={reset}
                    >Go Home</Button>
                </Link>


            </div>


        </div>
    )
}

export default error