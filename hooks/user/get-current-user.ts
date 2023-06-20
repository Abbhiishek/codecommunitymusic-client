'use client'
import { UserData } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetSessionUser = () => {


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user", "current"],
        queryFn: async () => {
            const session_token = typeof window !== 'undefined' ? localStorage.getItem("session_token") : null;
            if (!session_token) {
                return null
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getuser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                },
            });
            return data as UserData;
        },
        cacheTime: 0
    })
    return { data, error, isLoading, refetch }
}


