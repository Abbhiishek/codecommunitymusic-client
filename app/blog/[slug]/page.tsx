"use client";
"use strict";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlog } from "@/hooks/blog/getblog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";
import remarkGfm from 'remark-gfm';



interface BlogSlugProps {
    params: {
        slug: string
    }
}


function BlogSlug({ params }: BlogSlugProps) {
    const { data, isLoading } = useGetBlog(params.slug)
    if (isLoading) {
        return (
            <>
                <div className="py-5 ">
                    <div className="text-blue-700 cursor-pointer hover:text-blue-900">
                        <Link href={'/blog'} className="flex items-center gap-2">
                            <ArrowLeft />
                            <p>
                                Back to blogs
                            </p>
                        </Link>
                    </div>
                </div>
                <Skeleton className="w-full h-96" />
            </>
        )
    }

    return (
        <div>
            <div className="py-5 ">
                <div className="text-blue-700 cursor-pointer hover:text-blue-900">
                    <Link href={'/blog'} className="flex items-center gap-2">
                        <ArrowLeft />
                        <p>
                            Back to blogs
                        </p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="object-cover rounded-2xl">
                    <img
                        src={`https://wiidgets.vercel.app/api/banner?title=${data?.data?.blog.title}&bio=${data?.data?.blog.tags}&twitter=${data?.data?.blog.author.username}`}
                        className="w-full rounded-md shadow-md lg:rounded-2xl"
                        alt={data?.data?.blog.author.username} />
                </div>
                <h1 className="text-4xl font-semibold ">
                    {data?.data.blog.title}
                </h1>
                <span className="flex flex-wrap items-center justify-start gap-4 mt-2">
                    {data?.data.blog.tags?.map((tag: string, index: number) => {
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
                <div className="grid grid-cols-12 my-10">
                    <div className="w-1/4 col-span-2">
                        <p className="text-sm font-light">
                            {data?.data.blog.slug}
                        </p>
                    </div>
                    <article className="w-full col-span-10">
                        <h2>Table of Content</h2>
                        <ReactMarkdown
                            remarkPlugins={
                                [remarkGfm]
                            }
                            rehypePlugins={[
                                [rehypeSlug],
                                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                [rehypeHighlight],
                                rehypePrism,
                                [toc, {
                                    headings: "h1, h2, h3, h4, h5, h6",
                                    tight: true,
                                    className: "toc",
                                    slug: (text: String) => text.toLowerCase().replace(/\s/g, "-"),
                                    params: {
                                        depth: 3,
                                    }
                                }]
                            ]}
                        >
                            {data?.data?.blog.content!}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>
        </div >
    )
}

export default BlogSlug