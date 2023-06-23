import { useGetUser } from "@/hooks/user/getuser-username";

import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const AuthorHoverTag = ({ author }: { author: string }) => {
    const { data, isLoading } = useGetUser(author);
    if (isLoading) {
        return <Link href={`user/${author}`} legacyBehavior>
            <Button variant="link">@{author}</Button>
        </Link>
    }
    if (!data) {
        return <Link href={`user/${author}`} legacyBehavior>
            <Button variant="link">@{author}</Button>
        </Link>
    }
    return <>
        <Link href={`/user/${author}`}>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link" className="px-0 py-0 lg:text-lg">@{data.data.username}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <div className="flex justify-start space-x-4">
                        <Avatar
                            className="w-16 h-16"
                        >
                            <AvatarImage src={data.data.profile_pic} />
                            <AvatarFallback>{data.data.username.slice(0, 2) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 text-start">
                            <h4 className="text-sm font-semibold">{data.data.username}</h4>
                            <p className="text-sm">
                                {data?.data.bio.slice(0, 50)}...
                            </p>
                            <div className="flex items-center pt-2">
                                <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    Joined on {new Date(data?.data.created_at).toDateString().slice(4)}
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </Link>
    </>
}

export default AuthorHoverTag;