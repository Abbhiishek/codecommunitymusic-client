'use client'
import { IProjectData } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



// custom hook for getting projects
export const useGetProjects = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallprojects`);
            return data.data as IProjectData[];
        },
        cacheTime: 0,
    })
    return { data, isLoading, isError, error, refetch }
}


