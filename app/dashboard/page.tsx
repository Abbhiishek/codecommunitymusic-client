'use client'
import DailyQuoteCard from "@/components/dashboard/cards/DailyQuoteCard";
import ProgressCard from "@/components/dashboard/cards/ProgressCard";
import StatsCard from "@/components/dashboard/cards/StatsCard";
import Todocard from "@/components/dashboard/cards/Todocard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { useRouter } from "next/navigation";
import ChatFeatureAnnouchment from "./banner";

function Dashboard() {

    const { data, isLoading } = useGetSessionUser();
    const router = useRouter();


    if (isLoading) {
        return (
            <div className="w-full h-screen">
                <div className="grid h-full grid-cols-12 gap-2 grid-rows-10 lg:gap-10 lg:p-5">
                    <Skeleton className="w-full h-full col-span-12 lg:col-span-7" />
                    <Skeleton className="w-full col-span-12 row-span-2 lg:col-span-5" />
                    <Skeleton className="w-full col-span-12 row-span-3 lg:col-span-7" />
                    <Skeleton className="w-full col-span-12 row-span-1 lg:col-span-5" />
                </div>
            </div>
        )
    }
    if (!data && !isLoading) {
        router.push("/login")
    }


    return (
        <div className="w-full h-screen">
            <div className="lg:px-5 ">
                <ChatFeatureAnnouchment />
            </div>
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