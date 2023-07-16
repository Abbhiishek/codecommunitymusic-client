"use client"

import { AvatarImage } from "@/components/ui/avatar"
import { ShortUser } from "@/types/Author"
import { Avatar } from "@radix-ui/react-avatar"

function StudentList({ students }: { students: ShortUser[] }) {
    return (
        <div className="flex flex-col gap-3">
            {
                students.map((student: ShortUser, index: any) => (
                    <div key={index} className="flex items-center justify-start gap-2">
                        <Avatar className="">
                            <AvatarImage src={student.profile_pic} className="w-10 h-10 rounded-full" />
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium ">@{student.username}</span>
                            <span className="font-light text-slate-500">Karma: {student.karma}</span>
                        </div>
                    </div>
                ))
            }
            {
                students.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="font-light text-slate-500">No students yet</span>
                    </div>
                )
            }
        </div>
    )
}

export default StudentList