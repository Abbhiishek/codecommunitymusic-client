"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";



const GoogleLoginBtn = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const loginMutationwithemail = useMutation({
        mutationKey: ["directlogin", session?.user?.email],
        mutationFn: directloginUser,
    });


    async function directloginUser() {
        try {
            const { data: sessionUser } = await axios.get("http://localhost:3000/api/auth/session")
            console.log("the email is ----->", sessionUser.user.email);
            const { data: newdata } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/directlogin`, {
                email: sessionUser.user.email,
            });
            console.log(newdata);
            if (newdata.status === "success") {
                toast({
                    title: `Welcome ${newdata.data.username} 👋`,
                    description: "You are ready to go!",
                })
                localStorage.setItem("session_token", newdata.session_token);
                setLoading(false)
                router.push("/");
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                toast({
                    title: "something went wrong!",
                    description: error.response.data.message,
                })
            }
        }
    }



    return (
        <Button
            disabled={loading}
            onClick={async () => {
                await signIn("google")
                await loginMutationwithemail.mutate()
            }}
            className="w-full text-white "
            variant="outline"
        >
            {loading && <Loader className="mr-2 animate-spin" size={20} />}
            Login with Google
        </Button>
    )
}

export default GoogleLoginBtn