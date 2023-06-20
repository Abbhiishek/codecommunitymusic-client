'use client'


import { IChat } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting all forums
export const useGetChat = (forum: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["get chat of ", forum],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forum/${forum}/chat`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            });
            return data.data as IChat[];
        },
        cacheTime: 0,
    })
    return { data, isLoading, isError, error, refetch }
}


