
import { IProjectData } from "@/types/Project";
import axios from "axios";
import ProjectSlug from "./ProjectSlug";

interface ProjectProps {
    params: {
        projectSlug: string
    }
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallprojects`)
    return data.data.map((project: any) => ({
        params: {
            projectSlug: project.slug
        }
    }))
}

export async function generateMetadata({ params }: ProjectProps) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallprojects`)
    const project: IProjectData = data.data.find((project: any) => project.slug === params.projectSlug)
    return {
        title: project?.title,
        description: project?.subtitle,
        type: "project",
        keywords: [project?.title, project?.subtitle, project?.description, project?.tags, project?.author],
        openGraph: {
            title: project?.title,
            description: project?.subtitle,
            type: "article",
            publishedTime: project?.created_at,
            authors: [project?.author],
        },
    }
}

function Project({ params }: ProjectProps) {
    return (
        <ProjectSlug projectSlug={params.projectSlug} />
    )
}

export default Project