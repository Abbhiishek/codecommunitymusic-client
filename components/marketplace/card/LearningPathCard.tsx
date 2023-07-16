import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChartBig } from "lucide-react"
import Link from "next/link"


interface ILearningPathCard {
    slug: string
    title: string
    description: string
    students_count: number
    courses_count: number
    lessons_count: number
    level: string
}


function LearningPathCard({ title, description, students_count, courses_count, lessons_count, level, slug }: ILearningPathCard) {
    return (
        <div className="transition-all duration-200 shadow-2xl hover:bg-slate-300 rounded-xl">
            <Link href={`/marketplace/learning-path/${slug}`}>
                <Card className="w-full h-full transition-all duration-200 hover:translate-x-1 hover:-translate-y-2">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="truncate">

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="truncate">
                        {description.slice(0, 80)}
                    </CardContent>
                    <CardFooter className="flex items-end justify-between">
                        <div className="flex flex-col w-full gap-1 text-sm">
                            <span className="text-sm font-light text-slate-400 ">Enrolled by  <span className="font-bold">{students_count}+ Students</span></span>
                            <span className="text-sm font-light text-slate-400 ">Includes <span className="font-bold">{courses_count} Courses</span></span>
                            <Separator />
                            <div className="flex justify-between w-full text-sm">
                                <span className="flex gap-3">
                                    <BarChartBig size={16} />
                                    {level}</span>
                                <span>{lessons_count} Videos</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}

export default LearningPathCard