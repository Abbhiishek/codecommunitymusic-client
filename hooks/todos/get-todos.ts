import { TodoData } from "@/types/Todo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";





export const useGetUserTodos = (username: string) => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user", username],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/todos`, {
                headers: {
                    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
                }
            });
            return data as TodoData;
        },
        cacheTime: 60,
    })
    return { data, error, isLoading, refetch }
}