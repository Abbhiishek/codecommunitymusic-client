
import { IContributor } from "@/types/Contributors"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"


interface IContributorCardProps {
    contributor: IContributor
}


const ContributorCard = ({ contributor }: IContributorCardProps) => {

    return (
        <div className="lg:w-[420px] h-full rounded-lg  px-2 py-3 grid grid-cols-4 gap-4 justify-start border-2 border-slate-800 bg-blend-multiply">
            <Avatar
                className="w-20 col-span-1  h-20 rounded- border-cyan-600 border-2"
            >
                <AvatarImage src={`https://github.com/${contributor.githubUsername}.png`} />
                <AvatarFallback>{contributor.name.slice(0, 1)}</AvatarFallback>
            </Avatar>

            <div className="col-span-3 w-full">
                <h1 className="text-2xl font-sans font-semibold text-start">{contributor.name}</h1>
                <span className="text-sm font-medium">{contributor.role}</span>
                <span className="flex flex-wrap gap-2 py-2">
                    {
                        contributor.contributions.slice(0, 5).map((contribution, index) => (
                            <Link
                                key={index}
                                href={''}
                            >
                                <TooltipProvider key={index}>
                                    <Tooltip>
                                        <TooltipTrigger className="px-2 py-1  h-4 w-4 rounded-sm bg-green-500">
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>#{contribution.issueNumber}-{contribution.description} <br /> [{contribution.ScopeofChange}]</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>

                        ))
                    }
                    {contributor.contributions.length > 5 && <span className="px-2 py-1 mx-1 text-sm font-medium text-white bg-gray-800 rounded-full">+{contributor.contributions.length - 5}</span>}
                </span>
                <span>
                    &rarr; {contributor.rewviewWords}
                </span>
                <br />
            </div >
        </div >
    )
}

export default ContributorCard