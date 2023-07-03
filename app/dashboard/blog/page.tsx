"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import BlogTable from "./BlogTable"


export default function DashboardBlog() {
    const { data: user, isLoading } = useGetSessionUser()

    if (isLoading) {
        return <div className="flex flex-col w-full gap-2">
            <h1>Hang Tight 👀! we are crunching your data.</h1>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
        </div>
    }

    return (
        <div className="w-full overflow-hidden">
            <div className="w-full ">
                <BlogTable username={user?.data.username!} />
            </div>

        </div>
    )
}
