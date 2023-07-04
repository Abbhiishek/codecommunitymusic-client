import { queryClient } from "@/app/ReactQueryProvider";
import { IForum } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useGetForum = (slug: string) => {

    const cached_forum = queryClient.getQueryData(["forum", slug]) as IForum;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["forum", slug],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/forums/${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            });
            return data as IForum;
        },
        cacheTime: 60 * 60 * 30, // 30 minutes
    })

    if (cached_forum) {
        return { data: cached_forum, isLoading: false, isError: false, error: null, refetch };
    }

    return { data, isLoading, isError, error, refetch }
}


