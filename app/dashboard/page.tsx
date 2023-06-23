'use client'
import DailyQuoteCard from "@/components/dashboard/cards/DailyQuoteCard";
import ProgressCard from "@/components/dashboard/cards/ProgressCard";
import StatsCard from "@/components/dashboard/cards/StatsCard";
import Todocard from "@/components/dashboard/cards/Todocard";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { Loader } from "lucide-react";

function Dashboard() {

    const { data, isLoading } = useGetSessionUser();

    if (isLoading) return <div>
        <div className="flex items-center justify-center w-full h-screen">
            <Loader size={50} className="animate-spin" />
        </div>
    </div>
    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-12 gap-2 grid-rows-10 lg:gap-10 lg:p-5 ">
                <ProgressCard name={data?.data.first_name!} karma={data?.data.karma!} />
                <Todocard username={data?.data.username!} />
                <StatsCard karma={data?.data.karma!} />
                <DailyQuoteCard />
            </div>
        </div>
    )
}

export default Dashboard