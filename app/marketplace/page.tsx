import LearningPathCard from "@/components/marketplace/card/LearningPathCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import Link from "next/link"

interface ILearningPathCard {
    slug: string
    title: string
    description: string
    students_count: number
    courses_count: number
    lessons_count: number
    created_at: string
    updated_at: string
    about: string
    level: string
}


async function MarketPlace() {

    const { data: allLearningPath } = await axios.get(`${process.env.BACKEND_URL}/list/alllearningpaths`)


    return (
        <div className="w-full h-screen">
            <h1 className="text-3xl font-extrabold capitalize">Explore Marketplace </h1>
            <p className="font-light text-slate-500">
                Marketplace is a community-driven collection of resources
                that help you go from zero to hero in your programming language and framework journey. Interested in contributing?
            </p>
            <Link href={'marketplace/request-resource'}
                className="text-blue-500"
            >
                Contribute to Marketplace -&gt;
            </Link>
            <Separator className="my-6" />
            <div className="flex flex-col items-start justify-center gap-5">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-extrabold capitalize">Learning Paths</h1>
                    <p className="font-light text-slate-500">
                        Learning paths are a collection of resources, Courses, Videos & Cheatsheets.
                    </p>
                    <div className="grid grid-cols-1 gap-5 my-5 sm:grid-cols-2 lg:grid-cols-3">
                        {allLearningPath.learning_paths?.slice(0, 3).map((item: ILearningPathCard, index: string) => (
                            <LearningPathCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                students_count={item.students_count}
                                courses_count={item.courses_count}
                                lessons_count={item.lessons_count}
                                level={item.level || "Beginner"}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href={'/marketplace/learning-path'}>
                            <Button className="w-full">
                                View All Learning Paths -&gt;
                            </Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold capitalize">Projects</h1>
                    <p className="font-light text-slate-500">
                        Explore Community collections of projects to help you learn and build.
                    </p>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold capitalize">Cheatsheets</h1>
                    <p className="font-light text-slate-500">
                        Cheatsheets are a awesome way to learn and remember things. Explore community curated cheatsheets.
                    </p>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold capitalize">Videos</h1>
                    <p className="font-light text-slate-500">
                        Videos are a great way to learn. Explore community curated videos.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MarketPlace