
'use client';


import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from 'lucide-react';



const signupSchema = z.object({


    username: z.string({
        description: "Username  is required",
        required_error: "Username  is required",
        invalid_type_error: "Password is must be string",
    }).min(5, {
        message: "Username must be at least 4 characters long"
    }).regex(
        /^[a-zA-Z0-9_]+$/,
        {
            message: "Username must be alphanumeric and underscore only"
        }
    ),


    email: z.string({
        description: "Email  is required",
        required_error: "Email  is required",
        invalid_type_error: "Email is must be string",
    }).email({
        message: "Email is invalid"
    }).regex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    ),
    password: z.string({
        description: "Password  is required",
        required_error: "Password  is required",
        invalid_type_error: "Password is must be string",
    }).min(8, {
        message: "Password must be at least 8 characters long"
    }).max(100)

});

export default function SignUpForm() {
    // const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formerror, setFormerror] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const [signing, setsigning] = useState(false);

    const session_token = typeof window !== "undefined" ? localStorage.getItem("session_token") : null;

    useEffect(() => {
        if (session_token) {
            router.push("/");
        }
    }, [])


    const signupMutationwithusername = useMutation({
        mutationFn: signupUser,
    });

    async function signupUser() {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
                email,
                username,
                password
            });
            console.log("The signup mutation ", data);
            if (data.status === "success") {
                setsigning(false);
                toast({
                    title: `Welcome ${data.data.username} 👋 to Code Community Music`,
                    description: "You have successfully signed up",
                })
                if (rememberMe) {
                    localStorage.setItem("session_token", data.session_token);
                    router.refresh();
                    router.push("/setting/edit-profile");
                    toast({
                        title: `Complete your profile`,
                        defaultChecked: true,
                        description: "Please complete your profile",
                    })
                }

            }
        } catch (error: any) {
            console.log(error.response.data.username || error.response.data.email);
            if (error.response.status === 400) {
                setsigning(false);
                setFormerror(error.response.data.username || error.response.data.email);
                toast({
                    title: "Register Error!!",
                    description: error.response.data.username || error.response.data.email,
                })
            }
        }
    }

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setsigning(true);
        // alert("signup form submitted");
        const result = signupSchema.safeParse({
            username: username,
            email: email,
            password: password
        });
        if (!result.success) {
            setsigning(false);
            setFormerror(result.error.errors[0].message);
            toast({
                title: "Validation Error!!",
                description: result.error.errors[0].message,
            })
        } else {
            // console.log(result.data);
            signupMutationwithusername.mutate();
        }
    }

    return (
        <div className="flex items-center justify-center ">
            <Card className="lg:w-[450px] shadow-inner shadow-violet-500">
                <CardHeader>
                    <CardTitle
                        className="text-2xl font-semibold text-center"
                    >Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="username" >Username</Label>
                            <Input
                                type="text"
                                placeholder="username"
                                value={username}
                                id="username"
                                minLength={5}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <Label htmlFor="email">Password</Label>

                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-3 pr-10 py-2 rounded-lg"
                            />
                            <div className="absolute inset-y-0 right-2 top-6 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="bg-[#020817] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-900 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-3 space-x-2">
                            <div className="flex flex-row justify-start gap-2">
                                <Checkbox id="terms"
                                    checked={rememberMe}
                                    onClick={() => setRememberMe(!rememberMe)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remeber me
                                </label>
                            </div>

                        </div>
                        <p className="inline text-red-500">{formerror}</p>
                        <Button
                            className="w-full text-white bg-violet-500 hover:bg-violet-600 hover:scale-95/2"
                            variant="default"
                            type="submit"
                            disabled={signing}
                        >
                            {
                                signing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            }

                            Register
                        </Button>
                        <div className="flex justify-center mt-4">
                            <Link href='/login' legacyBehavior>
                                <a href="#" className="text-blue-500 hover:text-blue-600">
                                    Already have an account? Login
                                </a>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center w-full gap-4">
                            <hr className="w-full" />
                            <span className="flex justify-center text-center text-gray-500">Or</span>
                            <hr className="w-full" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col items-center justify-center w-full gap-5">
                        {/* <GithubsignupBtn />
                        <GooglesignupBtn /> */}
                        <span>Comming soon....</span>

                    </div>
                </CardFooter>

            </Card>
        </div >
    );
}


const PasswordStrengthBar = ({ passwordreset }: {
    passwordreset: number
}) => {


    return (
        <div className="flex flex-row justify-start gap-2">
            <div
                className={
                    `h-2 w-full rounded-full ${passwordreset >= 1 ? "bg-green-500" : "bg-gray-300"}`
                }
            >

            </div>
        </div>

    )
}