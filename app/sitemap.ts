import { Course } from "@/types/Course";
import { LearningPath } from "@/types/LearningPath";
import axios from "axios";

export default async function sitemap() {

    // const { data: projects } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/projects`);
    // const { data: blog } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/blogs`);
    const { data: courses } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/allcourses`)
    const { data: learningPaths } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/alllearningpaths`)


    const courses_url = courses.courses.map((course: Course) => {
        return {
            url: `${process.env.APP_URL}/course/${course.slug}`,
            changefreq: "daily",
            priority: 0.7,
            lastmodified: course.updated_at
        }
    })



    const learningPaths_url = learningPaths.learning_paths.map((learningpath: LearningPath) => {
        return {
            url: `${process.env.APP_URL}/learning-path/${learningpath.slug}`,
            changefreq: "daily",
            priority: 0.7,
            lastmodified: learningpath.updated_at
        }
    })



    const routes = ['', '/project', '/blog', '/forum', '/marketplace', '/marketplace/learning-path', '/marketplace/course',].map((route) => {
        return {
            url: `${process.env.APP_URL}${route}`,
            changefreq: "daily",
            priority: 0.7,
            lastmodified: new Date().toISOString()
        }
    }
    )


    return [
        ...routes,
        ...courses_url,
        ...learningPaths_url,

    ]
}

