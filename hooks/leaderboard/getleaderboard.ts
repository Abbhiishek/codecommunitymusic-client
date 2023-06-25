'use client'


import { queryClient } from "@/app/ReactQueryProvider";
import { ILeaderboard } from "@/types/leaderboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetLeaderboard = () => {

    const chached_leaderboard = queryClient.getQueryData(["leaderboard"]) as ILeaderboard;
    const { data, isLoading, error, fetchStatus } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            });
            return data as ILeaderboard
        },
        cacheTime: 60 * 60 * 60 * 24, // 24 hours
    })
    if (chached_leaderboard) {
        return { data: chached_leaderboard, isLoading: false, error: null, fetchStatus: "success" };
    }
    return { data, isLoading, error, fetchStatus }
}