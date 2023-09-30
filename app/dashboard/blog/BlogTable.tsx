'use client'


import { Skeleton } from "@/components/ui/skeleton"
import { useGetBlogWithUsername } from "@/hooks/blog/getblog-username"
import { columns } from "./columns"
import { DataTable } from "./data-table"

function BlogTable({ username }: { username: string }) {

    const { data, isLoading: dataloading } = useGetBlogWithUsername(username)


    if (dataloading) {
        return 
        <div className="flex flex-col w-full gap-2">
            <h1>Hang Tight 👀! we are crunching your data.</h1>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
        </div>
    }

    return (
        <div>
            <DataTable columns={columns} data={data!} />
        </div>
    )
}

export default BlogTable