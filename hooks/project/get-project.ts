
import { queryClient } from "@/app/ReactQueryProvider";
import { IProject } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProject = (projectSlug: string) => {
    const cached_project = queryClient.getQueryData(["projects", projectSlug]) as IProject;
    const { data, isLoading, error, fetchStatus } = useQuery({
        queryKey: ["projects", projectSlug],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/projects/${projectSlug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            });
            return data as IProject;
        },
        cacheTime: 60 * 60 * 30 // 30 minutes
    })
    if (cached_project) {
        return { data: cached_project, isLoading: false, error: null, fetchStatus };
    }
    return { data, isLoading, error, fetchStatus }
}