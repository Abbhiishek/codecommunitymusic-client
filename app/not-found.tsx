import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: '404 | Code Community Music',
    description: 'Could not find requested resource ☹️',
}


function notfound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="font-bold text-red-600 text-9xl">404</h1>
            <p>Could not find requested resource ☹️</p>
            <Link href={'/'}>
                <Button variant={"default"}>
                    Go back home
                </Button>
            </Link>

        </div>
    )
}

export default notfound