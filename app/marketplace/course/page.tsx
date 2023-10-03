import CourseCard from "@/components/marketplace/card/CourseCard"
import { Course } from "@/types/Course"
import axios from "axios"

async function Courses() {
    const { data: courses } = await axios.get(`${process.env.BACKEND_URL}/list/allcourses`)
    return (
        <div className="w-full h-screen">
            <h1 className="text-3xl font-extrabold capitalize">Explore Courses</h1>
            <p>

            </p>
            <div className="grid grid-cols-1 gap-5 my-5 lg:grid-cols-3">
                {courses.courses?.slice(0, 3).map((item: Course, index: string) => (
                    <CourseCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        students_count={item.students_count}
                        lessons_count={item.lessons_count}
                        slug={item.slug}
                        about={item.about}
                        authors={item.authors}
                        created_at={item.created_at}
                        updated_at={item.updated_at}
                        is_Active={item.is_Active}
                        students={item.students}
                        sub_courses={item.sub_courses}
                        resources={item.resources}
                    />
                ))}
            </div>
        </div>
    )
}

export default Courses