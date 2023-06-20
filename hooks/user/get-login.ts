'use client'

import { useMutation } from "@tanstack/react-query";
import axios from "axios";


interface ILoginData {
    username: string;
    password: string;
}

interface IUserLoginResponse {
    message: string;
    status: string;
    time_taken: string;
    data: {
        username: string;
        bio: string;
        first_name: string;
        last_name: string;
        karma: number;
        email: string;
        skills: string[];
        interests: string[];
        gender: string;
        age: number;
        phone: number;
        profile_pic: string;
        is_active: boolean;
        is_verified: boolean;
        created_at: string;
        updated_at: string;
    };
    session_token: string;
}



export const useGetUserLogin = ({ username, password }: ILoginData) => {

    const { data, error, isLoading } = useMutation({
        mutationKey: ["login", username, password],
        mutationFn: async () => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                username,
                password
            });
            return data as IUserLoginResponse;
        }
    })
    return { data, error, isLoading }
}
