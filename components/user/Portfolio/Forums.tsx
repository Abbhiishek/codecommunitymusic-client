'use client'

import ForumCard from "@/components/forum/forumCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetForumsWithUsername } from "@/hooks/forum/get-forums-with-username";


interface Props {
    username: string
}


function Forums({ username }: Props) {

    const { data: forums, isLoading } = useGetForumsWithUsername(username);


    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">Forums</h1>
            <div className="grid grid-cols-1 gap-2 pb-10 lg:grid-cols-2">
                <Separator className="col-span-1 my-4 lg:col-span-2" />
                {
                    isLoading && (
                        <>
                            <Skeleton className="w-full h-28" />
                            <Skeleton className="w-full h-28" />
                        </>
                    )
                }
                {
                    forums?.data?.map((forum, index) => (
                        <ForumCard key={index} forum={forum} />
                    ))
                }
            </div>
        </>
    )
}

export default Forums