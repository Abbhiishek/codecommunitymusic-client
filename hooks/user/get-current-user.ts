'use client'
import { queryClient } from "@/app/ReactQueryProvider";
import { UserData } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSessionUser = () => {

    const user_cache = queryClient.getQueryData(["user", "current"]) as UserData;

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
        cacheTime: 60 * 60 * 10 // 10 minutes
    });

    if (user_cache) {
        return { data: user_cache, isLoading: false, refetch, error: null };
    }

    return { data, isLoading, refetch, error }
}


