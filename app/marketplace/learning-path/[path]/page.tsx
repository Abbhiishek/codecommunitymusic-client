import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LearningPath } from "@/types/LearningPath"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import AuthorList from "./AuthorList"
import ExplorePath from "./ExplorePath"
import StudentList from "./StudentList"

export const revalidate = 160;


interface LearningPathProps {
    params: {
        path: string
    }
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/alllearningpaths`)
    return data.learning_paths.map((learningpath: LearningPath) => ({
        path: learningpath.slug
    }))
}

export async function generateMetadata({ params }: LearningPathProps) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/learningpath/${params.path}`)
    const learningpath: LearningPath = data.learning_path
    if (!learningpath) notFound()
    return {
        title: learningpath?.title,
        description: learningpath?.description,
        keywords: [learningpath?.title, learningpath?.description],
    }
}



async function Page({ params }: LearningPathProps) {


    const { data }: {
        data: {
            learning_path: LearningPath
        }
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/learningpath/${params.path}`)



    return (
        <div className="w-full h-screen">
            <div className="py-5 ">
                <div className="text-blue-700 cursor-pointer hover:text-blue-900">
                    <Link href={'/marketplace/learning-path'} className="flex items-center gap-2">
                        <ArrowLeft />
                        <p>
                            Back to Learning Paths
                        </p>
                    </Link>
                </div>
            </div>
            <h1 className="text-xl font-extrabold capitalize lg:text-3xl">{data.learning_path.title}</h1>
            <p className="font-light text-slate-500">
                {data.learning_path.description}
            </p>
            <div className="flex items-center gap-1">
                <span className="text-sm font-light text-slate-400 ">Authored by</span>
                {
                    data.learning_path.authors.slice(0, 5).map((author: any, index: any) => (
                        <Avatar key={index} className="w-6 h-6 -mr-3 border-2 group-hover:border-white">
                            <AvatarImage src={author.profile_pic} />
                        </Avatar>
                    ))
                }
                {
                    data.learning_path.authors.length > 5 && <p>
                        <span className="font-bold">+{data.learning_path.authors.length - 5}</span> more
                    </p>
                }
            </div>
            <div>
                <Tabs defaultValue="explore" className="w-full mt-10">
                    <TabsList className="justify-start w-full ">
                        <TabsTrigger value="explore">Explore</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="authors">Authors</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                    </TabsList>
                    <TabsContent value="explore">
                        <ExplorePath courses={data.learning_path.courses} externalVideos={data.learning_path.resources} />
                    </TabsContent>
                    <TabsContent value="students">
                        <StudentList students={data.learning_path.students} />
                    </TabsContent>
                    <TabsContent value="authors">
                        <AuthorList authors={data.learning_path.authors} />
                    </TabsContent>
                    <TabsContent value="about">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">About {data.learning_path.title}</span>
                            <span className="font-light text-slate-500">{data.learning_path.about}</span>
                            <Separator />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Page