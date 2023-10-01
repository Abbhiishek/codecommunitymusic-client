"use client"

import ContributorCard from "@/components/Contributor/ContributorsCard"
import WaveAnimations from "@/components/Waves"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Contributor } from "@/config/contributors"
import { IContributor } from "@/types/Contributors"
import { Github } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"


function Page() {


    const [Contributors] = useState<IContributor[]>(Contributor)
    const [FilterContributors, SetFilterContributors] = useState<IContributor[]>([])
    const [searchQuery, setsearchQuery] = useState("")
    useEffect(() => {
        if (searchQuery === "") return SetFilterContributors(Contributors!)
        setTimeout(() => {
            const contributor = Contributors?.filter(contributor => {
                const { name, role } = contributor;
                const lowerSearch = searchQuery.toLowerCase().replaceAll(/[^\w\s]/g, '').replace(/\s/g, '').trim();
                return (
                    name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch) ||
                    role.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch)
                );
            })
            SetFilterContributors(contributor!)
        }, 400)
    }, [searchQuery, Contributors])


    return (
        <>
            <div className=" mt-20 container ">
                <div className="flex items-center justify-between">
                    <div className="gap-2">
                        <h1 className="text-4xl font-bold">Contributors 🙌</h1>
                        <span className="text-gray-500">
                            Meet our awesome Contributors and code maintainers ❤️
                        </span>
                    </div>
                    <div>
                        <Button
                            variant={"default"}
                            size={"default"}
                            className=""
                        >
                            <Link
                                target="blank"
                                href={'https://github.com/Abbhiishek/codecommunitymusic-client'} className="flex gap-4">
                                <Github className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>


                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 justify-between w-full  lg:flex-row">
                        <Input
                            placeholder="Search for a contributor"
                            value={searchQuery}
                            onChange={(e) => setsearchQuery(e.target.value)}
                            className="w-full lg:w-1/2"
                        />
                    </div>
                </div>


                <div className="grid w-full gap-3 lg:grid-cols-2">
                    {
                        FilterContributors.map((contributor, index) => {
                            return (
                                <ContributorCard contributor={contributor} key={index} />
                            )
                        })
                    }
                </div>
            </div>
            <WaveAnimations />
        </>
    )
}

export default Page