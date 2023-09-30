'use client'

import CreateProject from "@/components/project/createProjectCard";
import ProjectCard from "@/components/project/projectCard";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { IProjectData } from "@/types/Project";
import { useEffect, useState } from "react";

function Projects({ projectData }: { projectData: IProjectData[] }) {
    const [search, setSearch] = useState('') // search query
    const { data: user } = useGetSessionUser()
    // const { data, isLoading: projectsloading, error } = useGetProjects()
    const [filteredProjects, setFilteredProjects] = useState<IProjectData[]>([])
    useEffect(() => {
        if (search === '') return setFilteredProjects(projectData!)
        setTimeout(() => {
            const project = projectData?.filter(project => {
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
    }, [search, projectData])


    return (
        <>
            <div className="container grid gap-4 mt-10 lg:grid-cols-12 pb-36">
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
                            <CreateProject />
                        </div>
                    </div>
                    {
                        filteredProjects?.length == 0 &&
                        <div className="flex flex-col items-center justify-center w-full lg:px-10 h-96">
                            <h1 className="font-serif text-4xl font-semibold">No Projects Found 😥</h1>
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