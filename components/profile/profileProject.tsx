'use client'

import { useGetProjectWithUsername } from "@/hooks/project/get-projects-with-username";
import ProjectCard from "../project/projectCard";


interface Props {
    username: string
}


function ProfileProject({ username }: Props) {

    const { data: projects, isLoading } = useGetProjectWithUsername(username);

    if (isLoading) return null;

    return (
        <div className="container grid grid-cols-2 gap-2 pb-10 lg:px-36">
            {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProfileProject