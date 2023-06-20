'use client'

import { useGetProject } from "@/hooks/project/get-project";
import { ResourceNotFoundError } from "@/lib/exceptions";

interface ProjectProps {
    params: {
        projectSlug: string
    }
}

function Project({ params }: ProjectProps) {
    const { data, isLoading, } = useGetProject(params.projectSlug)
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        throw ResourceNotFoundError;
    }
    return (
        <div
            className="container flex flex-col items-center justify-center h-screen"
        >Project : {JSON.stringify(data, null, 15)}



        </div>
    )
}

export default Project