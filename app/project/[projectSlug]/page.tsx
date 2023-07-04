
import { IProjectData } from "@/types/Project";
import axios from "axios";
import { notFound } from "next/navigation";
import ProjectSlug from "./ProjectSlug";

interface ProjectProps {
    params: {
        projectSlug: string
    }
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/projects`)
    return data.data.map((project: any) => ({
        projectSlug: project.slug
    }))
}

export async function generateMetadata({ params }: ProjectProps) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/projects`)
    const project: IProjectData = data.data.find((project: any) => project.slug === params.projectSlug)
    if (!project) return notFound()
    return {
        title: `${project?.title} | Code Community Music`,
        description: project?.subtitle,
        type: "article",
        keywords: [project?.title, project?.subtitle, project?.description, project?.tags, project?.author],
        openGraph: {
            title: project?.title,
            description: project?.subtitle,
            url: `https://codecommunitymusic.vercel.app/project/${project?.slug}`,
            type: "article",
            publishedTime: project?.created_at,
            authors: [project?.author],
            images: [
                {
                    url: `https://wiidgets.vercel.app/api/banner?title=${project?.title}&bio=${project?.subtitle}&twitter=${project?.author}`,
                    width: 800,
                    height: 600,
                    alt: project?.title,
                },
            ],
        },
    }
}

function Project({ params }: ProjectProps) {
    return (
        <ProjectSlug projectSlug={params.projectSlug} />
    )
}

export default Project