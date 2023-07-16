import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShortUser } from "@/types/Author"
import { Course } from "@/types/Course"
import Link from "next/link"


function CourseCard({ title, about, slug, authors, resources }: Course) {
    return (
        <div className="transition-all duration-200 shadow-2xl group hover:bg-slate-300 rounded-xl">
            <Link href={`/marketplace/course/${slug}`} >
                <Card className="w-full h-full transition-all duration-200 hover:translate-x-1 hover:-translate-y-2">
                    <CardHeader className="">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="truncate">
                            {about}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-end justify-between">
                        <div className="flex flex-col w-full gap-1 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-light text-slate-400 ">Authored by</span>
                                {
                                    authors.slice(0, 5).map((author: ShortUser, index: any) => (
                                        <Avatar key={index} className="w-6 h-6 -mr-3 border-2 group-hover:border-white">
                                            <AvatarImage src={author.profile_pic} />
                                        </Avatar>
                                    ))
                                }
                                {
                                    authors.length > 5 && <p>
                                        <span className="font-bold">+{authors.length - 5}</span> more
                                    </p>
                                }
                            </div>
                            <Separator className="" />
                            <div className="flex flex-row items-center justify-between">
                                <span>
                                    <span className="font-bold">{resources.length - 1}+ Videos</span>
                                </span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}

export default CourseCard