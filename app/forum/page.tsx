'use client'

import ForumCard from "@/components/forum/forumCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetForums } from "@/hooks/forum/get-forums"
import { IForumData } from "@/types/Forum"
import Link from "next/link"


function ForumPage() {

    const { data: forums, isLoading } = useGetForums()
    return (
        <div className="container flex flex-col gap-5 pt-10">
            <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
                <div className="justify-start w-full md:justify-end">
                    <p className="text-xl lg:text-4xl">Community Forum</p>
                    <span className="text-sm font-light text-gray-500">
                        Ask questions, share your knowledge, and get answered by other devs 😎.
                    </span>
                </div>
                <div className="flex items-end w-full md:justify-end">
                    <Link href={'/forum/create'}>
                        <Button>
                            Ask a question
                        </Button>
                    </Link>
                </div>
            </div>
            <Separator />
            {
                isLoading && !forums ? (
                    <div className="container">
                        <Skeleton className="w-full h-10 rounded-2xl" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {forums?.data?.map((forum: IForumData, index: number) => {
                            return (
                                <ForumCard forum={forum} key={index} />
                            )
                        })}
                    </div>
                )
            }

        </div>
    )
}

export default ForumPage