'use client'
import { QuoteData } from "@/types/Quote";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetProgrammingQuote = () => {


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["quote", "daily"],
        queryFn: async () => {
            const session_token = typeof window !== 'undefined' ? localStorage.getItem("session_token") : null;
            if (!session_token) {
                return null
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/randomprogrammingquote`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                },
            });
            return data as QuoteData;
        },
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    })
    return { data, error, isLoading, refetch }
}


