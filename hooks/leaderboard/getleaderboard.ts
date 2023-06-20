'use client'


import { ILeaderboard } from "@/types/leaderboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// custom hook for getting projects
export const useGetLeaderboard = () => {
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
        cacheTime: 0 // disable cache
    })
    return { data, isLoading, error, fetchStatus }
}