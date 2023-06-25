'use client'


import { Skeleton } from "@/components/ui/skeleton"
import { useGetProjectWithUsername } from "@/hooks/project/get-projects-with-username"
import { columns } from "./columns"
import { DataTable } from "./data-table"

function ProjectTable({ username }: { username: string }) {

    const { data, isLoading: dataloading } = useGetProjectWithUsername(username)


    if (dataloading) {
        return <div className="flex flex-col w-full gap-2">
            <h1>Hang Tight 👀! we are crunching your data.</h1>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
        </div>
    }

    return (
        <div className="w-full overflow-x-hidden">
            <DataTable columns={columns} data={data!} />
        </div>
    )
}

export default ProjectTable