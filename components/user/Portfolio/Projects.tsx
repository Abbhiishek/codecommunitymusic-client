'use client'

import { Separator } from "@/components/ui/separator";
import { useGetProjectWithUsername } from "@/hooks/project/get-projects-with-username";
import ProjectCard from "@components/user/Portfolio/ProjectCard";


interface Props {
    username: string
}


function Project({ username }: Props) {

    const { data: projects, isLoading } = useGetProjectWithUsername(username);

    if (isLoading) return null;

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">Projects</h1>
            <div className="grid grid-cols-1 gap-2 pb-10 lg:grid-cols-2">
                <Separator className="col-span-1 my-4 lg:col-span-2" />
                {projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    )
}

export default Project