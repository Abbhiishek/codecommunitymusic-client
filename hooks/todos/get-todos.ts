import { queryClient } from "@/app/ReactQueryProvider";
import { TodoData } from "@/types/Todo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetUserTodos = (username: string) => {

    const cached_user_todos = queryClient.getQueryData(["user", username, "todos"]) as TodoData;

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user", username, "todos"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/todos`, {
                headers: {
                    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
                }
            });
            return data as TodoData;
        },
        cacheTime: 60 * 60 * 4
    })
    if (cached_user_todos) {
        return { data: cached_user_todos, isLoading: false, error: null, refetch };
    }
    return { data, error, isLoading, refetch }
}