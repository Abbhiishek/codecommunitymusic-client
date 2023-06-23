'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUser } from "@/hooks/user/getuser-username";
import { IForumData } from "@/types/Forum";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

function ForumCard(
    { forum }: { forum: IForumData }
) {

    const { data: user, isLoading } = useGetUser(forum.author);

    if (isLoading) {
        return (
            <div>
                <Skeleton className="w-full h-20" />
            </div>
        )
    }

    return (
        <Link href={`/forum/${forum.slug}`}>
            <div className="flex flex-col w-full gap-3 p-5 border-4 rounded-xl">
                <div className="flex flex-col w-full gap-3 lg:flex-row">
                    <div className="w-full">
                        <Link href={`/user/${user?.data.username}`} className="flex items-center w-full gap-2">
                            <Avatar
                                className="w-10 h-10"
                            >
                                <AvatarImage src={user?.data.profile_pic} alt={user?.data.username} />
                                <AvatarFallback>{user?.data.username}</AvatarFallback>
                            </Avatar>

                            <span className="flex flex-col lg:text-lg">
                                <span>
                                    {user?.data.display_name}
                                </span>
                                <span className="text-sm font-extralight">
                                    @{user?.data.username}
                                </span>
                            </span>
                        </Link>
                    </div>
                    <span className="flex items-center justify-end w-full gap-4">
                        {
                            forum.is_solved ? <Badge className="text-white bg-green-500">Solved</Badge> :
                                <Badge
                                    variant={'destructive'}

                                >Unsolved</Badge>
                        }
                    </span>
                </div>
                <div className="flex flex-col gap-2 ">
                    <p className="text-lg font-semibold lg:text-2xl">{forum.title}</p>
                    <p className="font-light lg:text-lg">{forum.description.slice(0, 100)}...</p>
                    <span className="flex flex-wrap items-center gap-2">
                        {
                            forum.tags.length === 0 && <Badge className="text-white bg-gray-500">No tags</Badge>
                        }
                        {forum.tags.map((tag: string, index: number) => {
                            return (
                                <Badge
                                    key={index}
                                    variant={'secondary'}
                                    className=""
                                >
                                    {tag}
                                </Badge>
                            )
                        })}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default ForumCard