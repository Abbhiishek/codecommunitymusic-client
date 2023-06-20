import { Separator } from "@/components/ui/separator";
import { getLevel } from "@/lib/rankingsystem";
import { HeartHandshakeIcon, HelpCircle, Layout, TrophyIcon } from "lucide-react";

function Stats(
    { karma }: { karma: number }
) {

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
        <div className="grid grid-cols-2 gap-2 py-10">
            <h1 className="col-span-2 text-2xl font-semibold text-gray-700">Stats</h1>
            <Separator className="col-span-2 my-4" />

            {
                stats.map((stat, index) => (
                    <div className="col-span-2 bg-gray-900 lg:col-span-1 rounded-2xl " key={index}>
                        <div className="flex items-center justify-start gap-5 p-5 lg:p-10">
                            {stat.icon}
                            <div className="flex flex-col items-start justify-start">
                                <span className="text-lg font-semibold text-start">{stat.value}</span>
                                <span className="text-lg font-semibold text-gray-700">{stat.name}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default Stats