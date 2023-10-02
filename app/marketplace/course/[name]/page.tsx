import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import YouTube from "@/components/youtubecard/YoutubeCard";
import { Course } from "@/types/Course";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseContent from "./CourseContent";


export const revalidate = 10;

interface CourseProps {
    params: {
        name: string
    }
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/allcourses`)
    return data.courses.map((course: Course) => ({
        name: course.slug
    }))
}

export async function generateMetadata({ params }: CourseProps) {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/courses/${params.name}`)
    const course: Course = data.course
    if (!course) notFound()
    return {
        title: course?.title,
        description: course?.description,
        keywords: [course?.title, course?.description],
    }
}


async function Page({ params }: CourseProps) {


    const { data }: {
        data: {
            course: Course
        }
    } = await axios.get(`${process.env.BACKEND_URL}/list/courses/${params.name}`)

    return (
        <div className="w-full h-screen">
            <div className="py-5 ">
                <div className="text-blue-700 cursor-pointer hover:text-blue-900">
                    <Link href={'/marketplace/course'} className="flex items-center gap-2">
                        <ArrowLeft />
                        <p>
                            Back to Courses
                        </p>
                    </Link>
                </div>
            </div>
            <h1 className="text-2xl font-extrabold capitalize lg:text-3xl">{data.course.title}</h1>
            <p className="font-light text-slate-500">
                {data.course.about}
            </p>
            <div className="flex items-center gap-1 mt-2">
                <span className="text-sm font-light text-slate-400 ">Authored by</span>
                {
                    data.course.authors.slice(0, 5).map((author: any, index: any) => (
                        <Avatar key={index} className="w-6 h-6 -mr-3 border-2 group-hover:border-white">
                            <AvatarImage src={author.profile_pic} />
                        </Avatar>
                    ))
                }
                {
                    data.course.authors.length > 5 && <p>
                        <span className="font-bold">+{data.course.authors.length - 5}</span> more
                    </p>
                }
            </div>
            <Separator className="my-4" />

            <div>
                <article className="w-full">
                    <h2>Table of Content</h2>
                    <CourseContent content={data.course.description} />
                </article>
                <Separator className="my-4" />
                {data.course.resources.length > 0 && (
                    <>
                        <h2 className="text-2xl font-extrabold capitalize lg:text-3xl">Video Resources</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                            {data.course.resources.map((video, index) => (
                                <div key={index} className="p-2">
                                    <YouTube id={video} />
                                </div>
                            ))
                            }
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Page