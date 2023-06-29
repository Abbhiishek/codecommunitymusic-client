'use client'

import CreateProject from "@/components/project/createProjectCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjectWithUsername } from "@/hooks/project/get-projects-with-username";
import ProjectCard from "@components/user/Portfolio/ProjectCard";


interface Props {
    username: string
}


function Project({ username }: Props) {

    const { data: projects, isLoading } = useGetProjectWithUsername(username);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-700">Projects</h1>
                <div>
                    <CreateProject />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 pb-10 lg:grid-cols-2">
                <Separator className="col-span-1 my-4 lg:col-span-2" />
                {
                    isLoading && (
                        <>
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-40" />
                        </>

                    )
                }
                {projects && projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                {
                    projects?.length === 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">No Projects Found</span>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Project