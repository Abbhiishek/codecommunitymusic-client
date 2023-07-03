"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function GithubStats({ link }: { link: string }) {

    const [githubStats, setGithubStats] = useState<any>(null)

    const parts = link.split("/");
    const username = parts[3];
    const repository = parts[4];


    const { data, isLoading } = useQuery(["github-stats", link], async () => {
        const { data } = await axios.post(`https://api.github.com/repos/${username}/${repository}`, {
            headers: {
                "Authorization": `Bearer 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`
            }
        })
        return data
    })


    if (data) {
        setGithubStats(data)
        console.log(githubStats)
    }





    return (
        <>
            <span className="font-mono text-2xl font-semibold">
                Github Stats ✨
            </span>
            <div className="flex flex-wrap gap-2">
                <code className="transuate">{username}/{repository}</code>
                <Separator />
                {isLoading && <Skeleton className="w-full h-6" />}

                {data && (
                    <>
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-sm font-semibold">
                                Stars
                            </span>
                            <span className="font-mono text-sm font-semibold">
                                {data.stargazers_count}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-sm font-semibold">
                                Forks
                            </span>
                            <span className="font-mono text-sm font-semibold">
                                {data.forks_count}
                            </span>

                        </div>
                    </>
                )
                }
            </div>
        </>
    )
}

