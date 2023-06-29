import { queryClient } from "@/app/ReactQueryProvider";
import { IForums } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useGetForumsWithUsername = (username: string) => {

    const cached_forums = queryClient.getQueryData(["all forums", username]) as IForums;
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["all forums", username],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${username}/forums`, {
                headers: {
                    'Authorization': `Bearer ${typeof window !== 'undefined' && localStorage.getItem('session_token')}`
                }
            }
            );
            return data as IForums;
        },
        cacheTime: 60 * 60 * 4,
    })
    if (cached_forums) {
        return { data: cached_forums, isLoading: false, isError: false, error: null, refetch };
    }

    return { data, isLoading, isError, error, refetch }
}


