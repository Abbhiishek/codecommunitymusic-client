import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLevel } from "@/lib/rankingsystem";
import { HeartHandshakeIcon, HelpCircle, Layout, TrophyIcon } from "lucide-react";


function StatsCard({ karma }: { karma: number }) {

    const level = getLevel(karma);

    const stats = [
        {
            name: "Resourse Points",
            value: 0,
            icon: <Layout className="w-10 h-10 text-green-600" />
        },
        {
            name: "Forum Answered",
            value: 0,
            icon: <HelpCircle className="w-10 h-10 text-blue-600" />
        },
        {
            name: "Current league",
            value: level?.name,
            icon: <TrophyIcon className="w-10 h-10 text-yellow-500" />
        },
        {
            name: "Karmna points",
            value: karma,
            icon: <HeartHandshakeIcon className="w-10 h-10 text-red-700" />
        }
    ]


    return (
        <div className="w-full col-span-12 row-span-3 lg:col-span-7">
            <Card >
                <CardHeader>
                    <CardTitle>Check Out Your Profile Stats 👀</CardTitle>
                    <CardDescription>Here you can see your profile stats</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {
                            stats.map((stat, index) => (
                                <div className="flex items-center justify-between col-span-2 p-5 bg-gray-900 rounded-lg lg:p-0 lg:col-span-1 lg:h-36" key={index}>
                                    <div className="flex items-center justify-start gap-5 lg:p-5">
                                        {stat.icon}
                                        <div className="flex flex-col items-start justify-start">
                                            <span className="text-lg font-semibold text-start">{stat.value}</span>
                                            <span className="text-sm font-semibold text-gray-700 lg:text-lg">{stat.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Separator className="my-4" />
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCard