'use client'

import CreateProject from "@/components/project/createProjectCard";
import ProjectCard from "@/components/project/projectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetProjects } from "@/hooks/project/get-projects";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { AuthRequiredError } from "@/lib/exceptions";
import { IProjectData } from "@/types/Project";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Projects() {
    const [search, setSearch] = useState('') // search query
    const { data: user } = useGetSessionUser()
    const { data, isLoading: projectsloading, error } = useGetProjects()
    const [filteredProjects, setFilteredProjects] = useState<IProjectData[]>([])
    useEffect(() => {
        if (search === '') return setFilteredProjects(data!)
        setTimeout(() => {
            const project = data?.filter(project => {
                const { title, description, subtitle, tech_stack, tags, author } = project;
                const lowerSearch = search.toLowerCase().replaceAll(/[^\w\s]/g, '').replace(/\s/g, '').trim();
                return (
                    title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch) ||
                    description.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch) ||
                    subtitle.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch) ||
                    tech_stack.some((tech) => tech.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch)) ||
                    tags.some((tag) => tag.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch)) ||
                    author.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '').includes(lowerSearch)
                );
            })
            setFilteredProjects(project!)
        }, 400)
    }, [search, data])


    if (projectsloading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    )
    if (error) {
        throw AuthRequiredError;
    }

    return (
        <>
            <div className="container grid gap-4 mt-10 lg:grid-cols-12 pb-36">
                {/* <div className="w-full col-span-12 lg:col-span-3">
                    <ProjectFilterOptions search={search} setSearch={setSearch} />
                </div> */}
                <div className="flex flex-col w-full col-span-12 gap-3 overflow-y-auto lg:col-span-12">
                    <div className="flex flex-col justify-start gap-4">
                        <h1 className="font-serif text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Projects</h1>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between w-full gap-2 lg:flex-row">
                            <Input
                                placeholder="Search Projects"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full lg:w-1/2"
                            />
                            {user &&
                                user?.data.is_verified ?
                                <div className="">
                                    <CreateProject />
                                </div>
                                :
                                <Link href={`/login`} legacyBehavior>
                                    <Button
                                        variant={'secondary'}
                                        className="inline-block">
                                        Login to Create Project
                                    </Button>
                                </Link>
                            }
                        </div>
                    </div>

                    {
                        filteredProjects?.length == 0 &&
                        <div className="flex flex-col items-center justify-center w-full lg:px-10 h-96">
                            <h1 className="font-serif text-4xl font-semibold">No Projects Found</h1>
                            <Separator className="my-4" />
                            <p className="text-gray-400">Create a project to get started</p>
                        </div>
                    }
                    <div className="grid w-full gap-3 lg:grid-cols-2">
                        {filteredProjects?.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects