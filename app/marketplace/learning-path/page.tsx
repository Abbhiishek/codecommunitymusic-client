import LearningPathCard from "@/components/marketplace/card/LearningPathCard";
import { LearningPath } from "@/types/LearningPath";
import axios from "axios";

export const revalidate = 160;


export async function generateMetadata() {
    return {
        title: "Learning Paths - CCM",
        description: "Learning paths are a collection of resources, Courses, Videos & Cheatsheets.",
        keywords: "learning paths, learning, paths, courses, videos, cheatsheets , ccm , codecommunitymusic,developers, resources",
    }
}

async function page() {

    const { data: learningpaths } = await axios.get(`${process.env.BACKEND_URL}/list/alllearningpaths`)
    return (
        <div className="w-full min-h-screen">
            <h1 className="text-3xl font-extrabold capitalize">Explore Learning Paths</h1>
            <p className="font-light text-slate-500">
                Learning paths are a collection of resources, Courses, Videos & Cheatsheets.
            </p>
            <div className="grid grid-cols-1 gap-5 my-5 sm:grid-cols-2 lg:grid-cols-3">
                {learningpaths.learning_paths?.map((item: LearningPath, index: string) => (
                    <LearningPathCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        students_count={item.students_count}
                        courses_count={item.courses_count}
                        lessons_count={item.resources.length}
                        level={item.level || "Beginner"}
                        slug={item.slug}
                    />
                ))}
            </div>
        </div>
    )
}

export default page