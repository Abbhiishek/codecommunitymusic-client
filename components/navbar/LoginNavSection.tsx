
import { User2 } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import NavUserProfile from "./navUserProfile"



function LoginNavSection({ user }: { user: any }) {
    return (
        <>
            {user ?
                <NavUserProfile session={user} />
                :
                <>
                    <Link href='/login' passHref legacyBehavior>
                        <a className="text-sm font-semibold leading-6 text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </Link>
                    <Button
                        variant="default"
                        className="text-sm font-semibold leading-6 bg-gray-700 hover:bg-gray-600"
                    >
                        <Link href='/register' passHref legacyBehavior>
                            <a className="flex items-center justify-center gap-3 text-sm font-semibold leading-6 text-white">
                                Sign up <User2 />
                            </a>
                        </Link>
                    </Button>
                </>
            }
        </>
    )

}

export default LoginNavSection