'use client'

import { IChat } from "@/types/Forum";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import axios from "axios";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as z from 'zod';
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import ChatCard from "./chatCard";


const schema = z.object({
    answer: z.string().nonempty("Answer cannot be empty"),
})

const MarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false },
);


function ForumAnswer({ comments, forum, refetch, user }: { comments: IChat[], forum: string, refetch: Function, user: any }) {

    const [Answer, setAnswer] = useState("")
    const [submitting, setSubmitting] = useState(false)


    const handleAnswerSubmit = async () => {
        try {
            const result = schema.safeParse({ answer: Answer })
            if (!result.success) {
                toast({

                    title: "Error",
                    description: result.error.issues[0].message,
                })
            }
            setSubmitting(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/forums/${forum}/chat`, {
                content: Answer,
                author: user?.data.username,
                forum: forum,
                reply_to: null
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            })

            if (res.status === 201) {
                await refetch()
                toast({
                    title: "Success",
                    description: "Answer Posted",
                })
                setAnswer("")

            }
        } catch (error) {
            console.log(error)
        }
        setSubmitting(false)
    }

    return (
        <div className="pt-10">
            <Label className="text-lg">Answers</Label>
            <div>
                {
                    comments?.map((answer, index) => (
                        <ChatCard key={index} chat={answer} forum={forum} reply_to={answer.id} refetch={refetch} />
                    ))
                }

            </div>
            <Label className="text-lg">Your Answer</Label>
            <MarkdownEditor value={Answer} onChange={(e) => setAnswer(e)} className="min-h-[300px] lg:text-base" />

            <div className="flex flex-col items-center justify-between lg:flex-row">
                <span>
                    <span className="text-sm font-light text-gray-500">
                        You can use markdown to format your answer.
                    </span>
                </span>
                <Button variant={'default'} className="mt-2 "
                    disabled={submitting || Answer === "" || !user}
                    onClick={handleAnswerSubmit}>
                    {
                        submitting && (
                            <Loader2 className="ml-2 animate-spin" size={18} />
                        )
                    }
                    {
                        !user ? (
                            <span className="ml-2 text-red-500">
                                Login to post answer
                            </span>
                        ) : (
                            <span>Post Answer</span>
                        )
                    }
                </Button>
            </div>
        </div>
    )
}

export default ForumAnswer