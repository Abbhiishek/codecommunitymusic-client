import { queryClient } from "@/app/ReactQueryProvider";
import { IProjectData } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetProjects = () => {
    const cached_projects = queryClient.getQueryData(["all-projects"]) as IProjectData[];
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["all-projects"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallprojects`);
            return data.data as IProjectData[];
        },
        cacheTime: 60 * 60 * 30, // 30 minutes
    })
    if (cached_projects) {
        return { data: cached_projects, isLoading: false, isError: false, error: null, refetch };
    }
    return { data, isLoading, isError, error, refetch }
}


