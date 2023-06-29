"use client"

import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { IChat } from "@/types/Forum";
import axios from "axios";
import { ChevronUp, Trash2Icon, User2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";


const schema = z.object({
    answer: z.string().nonempty("Answer cannot be empty"),
})


const ReplyMarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false },
);

function ChatCard({ chat, forum, reply_to, refetch }: { chat: IChat, forum: string, reply_to: number | null, refetch: Function }) {

    const { data: logeduser, isLoading } = useGetSessionUser()

    const [showReplies, setShowReplies] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [showreplyEditor, setShowReplyEditor] = useState(false)
    const [reply, setReply] = useState('')

    if (isLoading && !logeduser) {
        return (
            <>
                <Skeleton className="w-full h-20" />
            </>
        )
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete/forums/${forum}/chat/${chat.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`
                }
            })
            if (res.status === 200) {
                await refetch()
                toast({
                    title: "Answer deleted successfully",
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAnswerSubmit = async () => {
        try {
            const result = schema.safeParse({ answer: reply })
            if (!result.success) {
                toast({

                    title: "Error",
                    description: result.error.issues[0].message,
                })
            }
            setIsReplying(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/forums/${forum}/chat`, {
                content: reply,
                author: logeduser?.data.username,
                forum: forum,
                reply_to: reply_to
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
                setReply("")
                setShowReplyEditor(false)

            }
        } catch (error) {
            console.log(error)
        }
        setIsReplying(false)
    }

    return (
        <div className="flex flex-row w-full gap-5 lg:p-4">
            <div>
                <Avatar >
                    <AvatarImage src={chat.author.profile_pic} alt={chat.author.display_name} />
                    <AvatarFallback>
                        <User2Icon />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="lg:text-lg">{chat.author.display_name || chat.author.username} {chat.id}</h2>
                            <span className="text-xs font-light text-gray-500 ">
                                {
                                    new Date(chat?.created_at).toLocaleDateString()
                                }
                            </span>
                        </div>
                        <div>
                            {
                                chat.author.username === logeduser?.data.username && (
                                    <span
                                        onClick={handleDelete}
                                        className="flex justify-end text-sm font-light text-red-800 cursor-pointer lg:text-base"
                                    >
                                        <Trash2Icon />
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <p className="text-sm lg:text-base">
                        <ReactMarkdown
                            // eslint-disable-next-line react/no-children-prop
                            children={chat?.content!}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            {...props}
                                            // eslint-disable-next-line react/no-children-prop
                                            children={String(children).replace(/\n$/, '')}
                                            style={materialDark}
                                            language={match[1]}
                                            PreTag="div"
                                            showLineNumbers={true}
                                            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                                            customStyle={{ borderRadius: '10px', padding: '1rem', overflowX: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
                                        />
                                    ) : (
                                        <code {...props} className={className}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                    </p>
                    <Separator className="w-full" />
                    <div className="flex gap-2">
                        {
                            chat?.replies?.length > 0 && (
                                <span className="flex text-sm font-light cursor-pointer lg:text-base " onClick={
                                    () => setShowReplies(!showReplies)
                                }>
                                    Show {chat?.replies?.length} replies {
                                        showReplies ? <ChevronUp /> : <ChevronUp className="rotate-180" />
                                    }
                                </span>
                            )
                        }
                        <span className="flex text-sm font-light cursor-pointer lg:text-base"
                            onClick={() => {
                                setShowReplyEditor(!showreplyEditor)
                            }}
                        >
                            Reply
                            {
                                showreplyEditor ? <ChevronUp /> : <ChevronUp className="rotate-180" />
                            }
                        </span>
                    </div>

                </div>
                {showReplies &&
                    chat.replies.map((reply, index) => {
                        return (
                            <ChatCard key={index} chat={reply} forum={forum} reply_to={reply.id ?
                                reply.id : chat.id
                            } refetch={refetch} />
                        )
                    })
                }
                {
                    showreplyEditor && (
                        <>
                            <span>Reply to {chat.author.username} {reply_to}</span>
                            <ReplyMarkdownEditor value={reply} onChange={(e) => setReply(e)} className="min-h-[300px] lg:text-base" />
                            <Button className="w-full" onClick={handleAnswerSubmit} disabled={isReplying}>
                                {isReplying ? "Replying..." : "Reply"}
                            </Button>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default ChatCard