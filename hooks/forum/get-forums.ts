'use client'


import { IForums } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting all forums
export const useGetForums = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["allforums"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forums`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            });
            return data as IForums;
        },
    })
    return { data, isLoading, isError, error, refetch }
}


