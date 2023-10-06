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
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { toast } from "@components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from 'lucide-react';



const loginSchema = z.object({
    email: z.string({
        description: "Email/Username  is required",
        required_error: "Email/username  is required",
        invalid_type_error: "Email/Username is must be string",
    }).min(4, {
        message: "Email/Username must be at least 4 characters long"
    }),
    password: z.string({
        description: "Password  is required",
        required_error: "Password  is required",
        invalid_type_error: "Password is must be string",
    }).min(8, {
        message: "Password must be at least 8 characters long"
    }).max(100)
});

export default function LoginForm() {
    const { refetch } = useGetSessionUser();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formerror, setFormerror] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const [loging, setLoging] = useState(false);


    const session_token = typeof window !== 'undefined' ? localStorage.getItem("session_token") : null;
    if (session_token) {
        router.push("/dashboard");
    }


    const loginMutationwithusername = useMutation({
        mutationFn: loginUser,
    });

    async function loginUser({ username, password }: {
        username: string;
        password: string;
    }) {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/login`, {
                username,
                password
            });
            if (data.status === "success") {
                await refetch()
                setLoging(false);
                toast({
                    title: `Welcome ${data.data.username} 👋`,
                    description: "You are ready to go!",
                })
                localStorage.setItem("session_token", data.session_token);
                router.refresh();
                window.location.reload();
                router.push("/dashboard");
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                setLoging(false);
                setFormerror(error.response.data.message);
                toast({
                    title: "Error",
                    description: error.response.data.message,
                })
            }
        }
    }

    const showPassHandler = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoging(true);
        // alert("Login form submitted");
        const result = loginSchema.safeParse({
            email: email,
            password: password
        });
        if (!result.success) {
            setFormerror(result.error.errors[0].message);
            toast({
                title: "Error",
                description: result.error.errors[0].message,
            })
            setLoging(false);

        } else {
            // console.log(result.data);
            loginMutationwithusername.mutate({
                username: email,
                password
            });
        }
    }

    return (
        <div className="flex items-center justify-center ">
            <Card className="lg:w-[450px]">
                <CardHeader>
                    <CardTitle
                        className="text-2xl font-semibold text-center"
                    >Login <br /> Code Community Music</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="username">Username / Email</Label>
                            <Input
                                type="text"
                                placeholder="username or email"
                                value={email}
                                id="username"
                                onChange={(e) => setEmail(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <Label htmlFor="password" className="mb-2">
                                Password
                            </Label>
                            <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                                <div className="absolute bottom-1 right-2 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="bg-[#020817] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-900 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
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
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link href='/passwordreset' legacyBehavior>
                                        <a href="#" className="text-blue-500 hover:text-blue-600">Forgot password?</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <p className="inline text-red-500">{formerror}</p>
                        <Button
                            className="w-full text-white bg-violet-500 hover:bg-violet-600 hover:scale-95/2"
                            variant="default"
                            type="submit"
                            disabled={loging}
                        >
                            {
                                loging && <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            }
                            Login
                        </Button>
                        <div className="flex justify-center mt-4">
                            <Link href='/register' legacyBehavior>
                                <a href="#" className="text-blue-500 hover:text-blue-600">
                                    Don&apos;t have an account yet ? Sign up
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
                        {/* <GithubLoginBtn /> */}
                        {/* <GoogleLoginBtn /> */}
                        <h1>On the way</h1>
                    </div>
                </CardFooter>
            </Card>
        </div >
    );
}
