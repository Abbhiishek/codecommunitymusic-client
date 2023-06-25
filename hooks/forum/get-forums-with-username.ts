'use client'
import { IForums } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting projects
export const useGetForumsWithUsername = (username: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["all forums", username],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/forums`, {
                headers: {
                    'Authorization': `Bearer ${typeof window !== 'undefined' && localStorage.getItem('session_token')}`
                }
            }
            );
            return data as IForums;
        },
    })
    return { data, isLoading, isError, error, refetch }
}


