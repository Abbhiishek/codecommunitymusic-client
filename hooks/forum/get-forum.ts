'use client'


import { IForum } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting all forums
export const useGetForum = (slug: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["forum", slug],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forums/${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            });
            return data as IForum;
        },
        cacheTime: 0,
    })
    return { data, isLoading, isError, error, refetch }
}


