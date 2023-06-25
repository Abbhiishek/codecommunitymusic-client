import { queryClient } from "@/app/ReactQueryProvider";
import { IChat } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useGetChat = (forum: string) => {

    const cached_chat = queryClient.getQueryData(["get chat of ", forum]) as IChat[];
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["get chat of ", forum],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forum/${forum}/chat`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            });
            return data.data as IChat[];
        },
        cacheTime: 60 * 60 * 30,
    })
    if (cached_chat) {
        return { data: cached_chat, isLoading: false, isError: false, error: null, refetch };
    }
    return { data, isLoading, isError, error, refetch }
}


