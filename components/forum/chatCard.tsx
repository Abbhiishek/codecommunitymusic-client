"use client"

import { useGetUser } from "@/hooks/user/getuser-username";
import { IChat } from "@/types/Forum";
import { User2Icon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


function ChatCard({ chat }: { chat: IChat }) {

    const { data: author, isLoading } = useGetUser(chat?.author)
    if (isLoading && !author) {
        return (
            <>
                loading.....
            </>
        )
    }
    return (
        <div className="flex flex-row gap-5 lg:p-10">
            <div>
                <Avatar >
                    <AvatarImage src={author?.data.profile_pic} alt={author?.data.display_name} />
                    <AvatarFallback>
                        <User2Icon />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <h2 className="lg:text-lg">{author?.data.display_name}</h2>
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
                                            customStyle={{ borderRadius: '10px', padding: '1rem', backgroundColor: '#2d2d2d', overflowX: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
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
                    <span className="text-sm font-light text-gray-500 lg:text-base">
                        Commented on {" "}
                        {
                            new Date(chat?.created_at).toLocaleDateString()
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ChatCard