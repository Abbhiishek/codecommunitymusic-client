"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useGetForum } from "@/hooks/forum/get-forum";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import axios from "axios";
import { Loader2, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


function ForumEditOption({ slug }: { slug: string }) {


    const { data, isLoading, refetch } = useGetForum(slug);
    const { data: user } = useGetSessionUser();
    const [ischanging, setIsChanging] = useState(false);
    const router = useRouter();


    if (isLoading) {
        return (
            <div className="container flex flex-col gap-2 pt-10">
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-full h-20" />
                    <span className="text-lg">
                        <Skeleton className="w-full h-5" />
                    </span>
                    <span className="flex flex-wrap items-center justify-start gap-4">
                        <Skeleton className="w-full h-20" />
                    </span>
                </div>
            </div>
        )
    }


    const handleDelete = async () => {

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete/forums/${data?.data.slug}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session_token')}`
            }
        })
        if (res.status === 204) {
            toast({
                title: 'Forum deleted',
                description: 'Forum deleted successfully',
            })
            router.push('/forum')
        }
    }

    const handleSolved = async () => {
        setIsChanging(true);
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update/forums/${data?.data.slug}`, {
            is_solved: !data?.data.is_solved
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session_token')}`
            }
        })
        if (res.status === 200) {
            await refetch();
            toast({
                title: 'Forum status changed',
                description: 'Forum status changed successfully',
            })
        }
        setIsChanging(false);
    }

    return (
        <>
            {
                (data?.data.author.username == user?.data.username) ? (
                    <div className="flex items-center justify-end gap-10 mt-2">
                        <span className="font-light text-gray-400">Toggle the status by clicking the button</span>
                        {
                            data?.data.is_solved ? (
                                <Button variant={'success'} onClick={() => {
                                    handleSolved()
                                }}>
                                    {ischanging && <Loader2 className="animate-spin" />}
                                    Solved
                                </Button>
                            ) : (
                                <Button variant="destructive" onClick={() => {
                                    handleSolved()
                                }}>
                                    {ischanging && <Loader2 className="animate-spin" />}
                                    Unsolved
                                </Button>
                            )
                        }
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="" />
                        </Button>
                    </div>
                ) : null
            }
        </>
    )
}

export default ForumEditOption