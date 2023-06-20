'use client'
import LeaderboardTable from "@/components/leaderboard/leaderboardTable"
import { useGetLeaderboard } from "@/hooks/leaderboard/getleaderboard"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import { Loader2 } from "lucide-react"

function Page() {
    const { data, isLoading } = useGetLeaderboard()
    const { data: user, isLoading: userloading } = useGetSessionUser()

    if (isLoading || userloading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container lg:p-10">
            <h1 className="font-mono text-lg font-bold">Leaderboard</h1>
            <p>
                Check out the top {data?.leaderboard.length} Devs on the leaderboard!
            </p>
            <div className="lg:p-10">
                <LeaderboardTable leaderboard={data?.leaderboard!} user={user!} />
            </div>
            <span className="flex flex-col">
                <span className="font-bold">Note:</span>
                The leaderboard is updated every 24 hours.
                The leaderboard is based on the karma gained by the user.

                <p>
                    <span className="font-bold">Karma</span> is a metric that is used to measure the contribution of a user to the community.
                    The more the karma, the more the contribution.
                </p>

                <p>
                    <span className="font-bold">Karma</span> is gained by:
                    <ul className="list-disc list-inside">
                        <li>Creating post , projects</li>
                        <li>Solving doubts through forums</li>
                        <li>Contributing to other&apos;s projects</li>
                        <li>and much more ...</li>
                        <li>and some secret moves that yet to discovered 😀</li>
                    </ul>
                </p>
            </span>
        </div>
    )
}

export default Page