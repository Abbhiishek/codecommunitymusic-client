"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getLevel, getprogress } from "@/lib/rankingsystem";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";


function ProgressCard({ name, karma }: { name: string, karma: number }) {
    const [progress, setProgress] = useState(0)
    const level = getLevel(karma);

    useEffect(() => {
        const progress = getprogress(karma)
        const timer = setTimeout(() => setProgress(progress), 500)
        return () => clearTimeout(timer)
    }, [])


    return (
        <Card className="w-full col-span-12 lg:col-span-7">
            <CardHeader>
                <CardTitle>Welcome, {name} 👋</CardTitle>
                <CardDescription>
                    Well done on your progress so far! Keep it up! <br />
                    You are {level?.max! - karma!} away from the next level! 😁
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-start">
                    <p className={`${level?.color}`}>{level?.name}</p>
                    <Dot size={26} />
                    <p className="text-sm">{karma} karma</p>
                </div>
                <Progress value={
                    progress
                } className="w-full h-2 " />
                <div className="flex items-center justify-end pt-2">
                    <span className="text-xs">{getprogress(karma!)}%</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProgressCard