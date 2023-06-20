'use client'

import { useGetChat } from "@/hooks/chat/get-chat";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import axios from "axios";
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


function ForumAnswer({ forum }: { forum: string }) {

    const [Answer, setAnswer] = useState("")

    const { data: answers, isLoading, refetch } = useGetChat(forum)




    const handleAnswerSubmit = async () => {
        try {
            const result = schema.safeParse({ answer: Answer })
            if (!result.success) {
                toast({

                    title: "Error",
                    description: result.error.issues[0].message,
                })
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forum/${forum}/chat`, {
                content: Answer
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            })

            if (res.status === 201) {
                toast({
                    title: "Success",
                    description: "Answer Posted",
                })
                setAnswer("")
                await refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="pt-10">
            <Label className="text-lg">Answers</Label>
            <div>
                {
                    isLoading ? <div>Loading...</div> : answers?.map((answer, index) => (
                        <ChatCard key={index} chat={answer} />
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
                <Button variant={'default'} className="mt-2 " onClick={handleAnswerSubmit}>
                    Post Answer
                </Button>
            </div>
        </div>
    )
}

export default ForumAnswer