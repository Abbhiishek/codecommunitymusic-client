"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import ProjectTable from "./ProjectTable"

export default function DashboardProject() {
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
                <ProjectTable username={user?.data.username!} />
            </div>

        </div>
    )
}


