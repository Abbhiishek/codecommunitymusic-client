/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from "@/components/ui/button";
import { IProjectData } from "@/types/Project";
import Link from "next/link";


interface IProjectCardProps {
    project: IProjectData;
}

const ProjectCard = ({
    project,
}: IProjectCardProps) => {

    return (
        <div className="grid justify-start grid-cols-7 gap-3 border-2 rounded-lg shadow-2xl ">
            <div className="flex items-center justify-center w-full h-full col-span-7 bg-cover rounded-lg lg:col-span-3 aspect-video">
                <img
                    src={`https://wiidgets.vercel.app/api/banner?title=${project?.title}&bio=&twitter=${project?.author}`}
                    width={1000} height={100}
                    alt={project?.title} className="object-cover w-full h-full rounded-lg" />
            </div>
            <div className="flex flex-col items-start justify-start w-full col-span-7 p-2 lg:col-span-4 text-start">
                <span className="text-2xl font-semibold text-start">{project.title}</span>
                <span className="pb-3 text-base font-medium text-start">
                    {project.subtitle.slice(0, 50)}
                    {
                        project.subtitle.length > 50 ? ' ...' : ''
                    }
                </span>
                <hr className="w-full h-2 py-2" />
                <span className="flex flex-wrap gap-2 pb-2">
                    {
                        project.tech_stack.slice(0, 3).map((tech, index) => (
                            <span key={index} className="px-2 py-1 mx-1 text-sm font-medium text-white bg-gray-800 rounded-full">{tech}</span>
                        ))
                    }
                    {project.tech_stack.length > 3 && <span className="px-2 py-1 mx-1 text-sm font-medium text-white bg-gray-800 rounded-full">+{project.tech_stack.length - 3}</span>}
                </span>
                <span className="font-light text-clip ">
                    {project.description.slice(0, 150)}
                    {
                        project.description.length > 150 ? ' ...' : ''
                    }
                </span>
                <span className="flex flex-wrap items-center gap-2 pb-2">
                    {
                        project.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-sm italic text-slate-500">#{tag}</span>
                        ))
                    }
                    {project.tags.length > 3 && <span className="px-2 py-1 mx-1 text-sm font-medium text-white bg-gray-800 rounded-full">+{project.tags.length - 3}</span>}
                </span>
                <span className="flex flex-col justify-end w-full h-full">
                    <Link href={`/project/${project.slug}`}>
                        <Button
                            variant={'secondary'}
                            className="w-full rounded-full "
                        >View Project
                        </Button>
                    </Link>
                </span>
            </div>
        </div>
    )
}


export default ProjectCard;







