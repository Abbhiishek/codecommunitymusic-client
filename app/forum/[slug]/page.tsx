'use client'
import ForumAnswer from "@/components/forum/forumAnswer";
import AuthorHoverTag from "@/components/project/AuthorHoverTag";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetForum } from "@/hooks/forum/get-forum";
import { Separator } from "@components/ui/separator";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';


interface ForumSlugPageProps {
    params: {
        slug: string
    }
}

function ForumSlugPage({ params }: ForumSlugPageProps) {

    const { data, isLoading } = useGetForum(params.slug);

    if (isLoading && !data) {
        return (
            <div className="container flex flex-col gap-2 pt-10">
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-full h-20" />
                    <span className="text-lg">
                        <Skeleton className="w-full h-5" />
                    </span>
                    <span className="flex flex-wrap items-center justify-start gap-4">
                        <Skeleton className="w-full h-20" />
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className="container pt-10">
            <div className="py-5 ">
                <div className="text-blue-700 cursor-pointer hover:text-blue-900">
                    <Link href={'/forum'} className="flex items-center gap-2">
                        <ArrowLeft />
                        <p>
                            Back to forums
                        </p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-4xl font-semibold ">
                    {data?.data?.title}
                </h1>
                <span className="text-lg">
                    Asked by
                    <AuthorHoverTag author={data?.data?.author!} /> on {" "}
                    {
                        new Date(data?.data?.created_at!).getUTCDate() + '/' + new Date(data?.data?.created_at!).getUTCMonth() + '/' + new Date(data?.data?.created_at!).getUTCFullYear()
                    }
                </span>
                <span className="flex flex-wrap items-center justify-start gap-4">
                    {data?.data?.tags?.map((tag: string, index: number) => {
                        return (
                            <Badge key={index}
                                variant={'secondary'}
                                className="text-sm font-light">
                                {tag}
                            </Badge>
                        )
                    })}
                </span>
                <Separator className="my-5" />
                {
                    data?.data?.description === '' ? (
                        <p className="text-lg font-light text-gray-400">
                            No description provided
                        </p>
                        // eslint-disable-next-line react/no-children-prop
                    ) : <ReactMarkdown children={data?.data?.description!}
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
                }
            </div>

            <div className="pb-10 my-10">
                <Separator className="my-5" />
                <ForumAnswer forum={data?.data.slug!} />
            </div>
        </div>
    )
}

export default ForumSlugPage