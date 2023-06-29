
import { queryClient } from "@/app/ReactQueryProvider";
import { IForums } from "@/types/Forum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useGetForums = () => {

    const cached_forums = queryClient.getQueryData(["allforums"]) as IForums;
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["allforums"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/forums`);
            return data as IForums;
        },
        cacheTime: 60 * 60 * 2, // 2 hours
    })
    if (cached_forums) {
        return { data: cached_forums, isLoading: false, isError: false, error: null, refetch };
    }
    return { data, isLoading, isError, error, refetch }
}


