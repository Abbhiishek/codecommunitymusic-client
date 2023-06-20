'use client'
import { IProject } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// custom hook for getting projects
export const useGetProject = (projectSlug: string) => {
    const { data, isLoading, error, fetchStatus } = useQuery({
        queryKey: ["projects", projectSlug],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectSlug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            });
            return data as IProject;
        },
        cacheTime: 0 // disable cache
    })
    return { data, isLoading, error, fetchStatus }
}