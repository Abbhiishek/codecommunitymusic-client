"use client"

import ForumAnswer from "@/components/forum/forumAnswer";
import AuthorHoverTag from "@/components/project/AuthorHoverTag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useGetForum } from "@/hooks/forum/get-forum";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { Separator } from "@components/ui/separator";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import axios from "axios";
import { ArrowLeft, Loader2, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
interface ForumSlugPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/forums`)
    return data.data.map((project: any) => ({
        params: {
            projectSlug: project.slug
        }
    }))
}


function ForumSlugPage({ params }: ForumSlugPageProps) {


    const { data, isLoading, refetch } = useGetForum(params.slug);
    const { data: user } = useGetSessionUser();
    const [ischanging, setIsChanging] = useState(false);
    const router = useRouter();

    const handleSolved = async () => {
        setIsChanging(true);
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update/forums/${data?.data.slug}`, {
            is_solved: !data?.data.is_solved
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session_token')}`
            }
        })
        if (res.status === 200) {
            await refetch();
            toast({
                title: 'Forum status changed',
                description: 'Forum status changed successfully',
            })
        }
        setIsChanging(false);
    }



    const handleDelete = async () => {

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete/forums/${data?.data.slug}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session_token')}`
            }
        })
        if (res.status === 204) {
            toast({
                title: 'Forum deleted',
                description: 'Forum deleted successfully',
            })
            router.push('/forum')
        }
    }


    if (isLoading) {
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

    if (!data?.data) {
        toast({
            title: 'Forum not found',
            description: 'we are redirecting you to the forums page',
            variant: "destructive"
        })
        return router.push('/forum')
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
                    <AuthorHoverTag author={data?.data.author.username!} /> on {" "}
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
                {
                    (data?.data.author.username == user?.data.username) ? (
                        <div className="flex items-center justify-end gap-10 mt-2">
                            <span className="font-light text-gray-400">Toggle the status by clicking the button</span>
                            {
                                data?.data.is_solved ? (
                                    <Button variant={'success'} onClick={() => {
                                        handleSolved()
                                    }}>
                                        {ischanging && <Loader2 className="animate-spin" />}
                                        Solved
                                    </Button>
                                ) : (
                                    <Button variant="destructive" onClick={() => {
                                        handleSolved()
                                    }}>
                                        {ischanging && <Loader2 className="animate-spin" />}
                                        Unsolved
                                    </Button>
                                )
                            }
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                <TrashIcon className="" />
                            </Button>
                        </div>
                    ) : null
                }
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
                <ForumAnswer comments={data?.comments!} forum={data?.data.slug!} refetch={refetch} user={user} />
            </div>
        </div>
    )
}

export default ForumSlugPage