'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { UserData } from "@/types/User"
import { ILeaderboardData } from "@/types/leaderboard"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

function LeaderboardTable(
    { leaderboard, user }: { leaderboard: ILeaderboardData[], user: UserData }
) {



    // TODO: get the rank of the user and highlight it from the leaderboard

    const signedInUserRank = leaderboard?.findIndex((item: ILeaderboardData) => {
        return item.username === user?.data?.username
    })

    return (
        <Table className="w-full">
            <TableCaption>
                Contribute to the community and get on the leaderboard! 🏆
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">RANK</TableHead>
                    <TableHead>USER</TableHead>
                    <TableHead>MEMBER SINCE</TableHead>
                    <TableHead className="text-right">KARMA GAINED</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className=" bg-slate-800">
                    <TableCell className="font-medium">
                        <Badge variant="default">
                            {signedInUserRank + 1}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <Link href={`/user/${user?.data.username}`}>
                            <div className="flex items-center justify-start gap-4">
                                <Avatar>
                                    <AvatarImage src={user?.data.profile_pic} alt={user.data.username} />
                                    <AvatarFallback>{user?.data.username}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-medium">{user.data.display_name}</p>
                                    <p className="font-medium">@{user.data.username}</p>
                                </div>
                            </div>
                        </Link>
                    </TableCell>
                    <TableCell>
                        {new Date(user.data.created_at).toDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant="default">{user.data.karma}</Badge>
                    </TableCell>
                </TableRow>
                {
                    leaderboard.map((item: ILeaderboardData, index: number) => {
                        return (
                            <TableRow key={index + 1} className="rounded-lg">
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <Link href={`/user/${item.username}`}>
                                        <div className="flex items-center justify-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={item.profile_pic} alt={item.username} />
                                                <AvatarFallback>{item.username}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="font-medium">{item.display_name}</p>
                                                <p className="font-medium">@{item.username}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {new Date(item.created_at).toDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="default">{item.karma}</Badge>
                                </TableCell>
                            </TableRow>
                        )
                    }
                    )}
            </TableBody>
        </Table>
    )
}

export default LeaderboardTable