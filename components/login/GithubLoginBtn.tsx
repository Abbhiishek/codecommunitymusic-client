'use client';

import axios from "axios";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";



const GithubLoginBtn = () => {



    return (
        <Button
            onClick={async () => {
                await signIn("github", {
                    redirect: false,
                })
                await DirectloginUser()
                DirectloginUser()
            }}
            className="w-full text-white "
            variant="outline"
        >Login with Github
            <GithubIcon
                className="inline-block w-5 h-5 ml-2"

            />
        </Button>

    )

}


export default GithubLoginBtn


async function DirectloginUser() {
    const { data: sessionUser } = await axios.get("http://localhost:3000/api/auth/session")
    try {
        const { data: newdata } = await axios.post(`${process.env.BACKEND_URL}/directlogin`, {
            email: sessionUser?.user?.email,
        });
        console.log(newdata);
        if (newdata.status === "success") {
            toast({
                title: `Welcome ${newdata.data.username} 👋`,
                description: "You are ready to go!",
            })
            localStorage.setItem("session_token", newdata.session_token);
        }
        else {
            toast({
                title: "oop!",
                description: "No user found with this email",
            })
        }
    } catch (error: any) {
        if (error.response.status === 400) {
            toast({
                title: "Error",
                description: error.response.data.message,
            })
        }
    }

    return null
}