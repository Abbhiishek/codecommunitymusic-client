'use client'

import { Button } from "@/components/ui/button"


const error = ({
    error,
    reset
}: {
    error: Error,
    reset: () => void
}) => {

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <h4>Something Went Wrong 🥲</h4>
            <h1 className="text-6xl font-extrabold text-red-600">{error.message || " 404 Project Not Found"}</h1>
            <div className="flex items-center justify-center gap-5 mt-4">
                <Button
                    variant={"outline"}
                    onClick={reset}
                >Retry</Button>
                <Button
                    className="bg-green-700"
                    variant={"secondary"}
                    onClick={reset}
                >Go Home</Button>

            </div>


        </div>
    )
}

export default error