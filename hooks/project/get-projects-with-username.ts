'use client'
import { IProjectData } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting projects
export const useGetProjectWithUsername = (username: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["projects", username],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/projects`, {
                headers: {
                    'Authorization': `Bearer ${typeof window !== 'undefined' && localStorage.getItem('session_token')}`
                }
            }
            );
            return data.data as IProjectData[];
        },
        cacheTime: 0,
    })
    return { data, isLoading, isError, error, refetch }
}


