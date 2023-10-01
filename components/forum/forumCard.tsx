'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IForumData } from "@/types/Forum";
import Link from "next/link";
import { Badge } from "../ui/badge";

function ForumCard({ forum }: { forum: IForumData }) {
    return (
        <Link href={`/forum/${forum.slug}`} legacyBehavior passHref className="cursor-pointer">
            <div className="flex flex-col w-full gap-3 p-5 border-4 rounded-xl">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="">
                        <Link href={`/user/${forum?.author.username}`} className="flex items-center gap-2">
                            <Avatar
                                className="w-10 h-10"
                            >
                                <AvatarImage src={forum?.author.profile_pic} alt={forum?.author.username} />
                                <AvatarFallback>{forum?.author.username}</AvatarFallback>
                            </Avatar>

                            <span className="flex flex-col w-fit lg:text-lg">
                                <span>
                                    {forum?.author.display_name}
                                </span>
                                <span className="text-sm font-extralight">
                                    @{forum?.author.username}
                                </span>
                            </span>
                        </Link>
                    </div>
                    <span className="flex items-center justify-end gap-4">
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
                    <p className="font-light truncate lg:text-lg">{forum.description}</p>
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