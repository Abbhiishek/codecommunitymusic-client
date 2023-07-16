import CourseCard from "@/components/marketplace/card/CourseCard"
import { Course } from "@/types/Course"

function InteractiveView({ courses }: { courses: Course[] }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
                <div className="flex flex-col w-full h-full " key={index}>
                    <CourseCard
                        title={course.title}
                        description={course.description}
                        students_count={course.students_count}
                        lessons_count={course.lessons_count}
                        slug={course.slug}
                        about={course.about}
                        authors={course.authors}
                        created_at={course.created_at}
                        updated_at={course.updated_at}
                        is_Active={course.is_Active}
                        students={course.students}
                        sub_courses={course.sub_courses}
                        resources={course.resources}
                    />
                </div>
            ))}
        </div>
    )
}

export default InteractiveView