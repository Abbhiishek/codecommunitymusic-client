'use client'
import { queryClient } from "@/app/ReactQueryProvider";
import { IProjectData } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjectWithUsername = (username: string) => {

    const chached_projects = queryClient.getQueryData(["projects", username]) as IProjectData[];

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
        cacheTime: 60 * 60 * 5,
    })

    if (chached_projects) {
        return { data: chached_projects, isLoading: false, isError: false, error: null, refetch };
    }
    return { data, isLoading, isError, error, refetch }
}


