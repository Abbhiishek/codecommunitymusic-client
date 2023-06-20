import { UserData } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";





export const useGetUser = (username: string) => {

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
        cacheTime: 0,
    })
    return { data, error, isLoading }
}