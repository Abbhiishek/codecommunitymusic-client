

import { queryClient } from "@/app/ReactQueryProvider";
import { UserData } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = (username: string) => {
    const username_user_cache = queryClient.getQueryData(["user", username]) as UserData;
    const { data, isLoading, error } = useQuery({
        queryKey: ["user", username],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
                }
            });
            return data as UserData;
        },
        cacheTime: 60 * 60 * 5
    })

    if (username_user_cache) {
        return { data: username_user_cache, isLoading: false, error: null };
    }
    return { data, error, isLoading }
}