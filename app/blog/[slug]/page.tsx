/* eslint-disable @next/next/no-img-element */


import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IBlogData } from "@/types/Blog";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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


export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/blogs`)
    return data.data.map((blog: IBlogData) => ({
        slug: blog.slug
    }))
}


export async function generateMetadata({ params }: BlogSlugProps) {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/blogs`)
    const blog: IBlogData = data.data.find((blog: any) => blog.slug === params.slug)
    if (!blog) notFound()
    return {
        title: blog?.title,
        description: blog?.content,
        type: "article",
        keywords: [blog?.title, blog?.content, blog?.tags, blog?.author],
        openGraph: {
            title: blog?.title,
            description: blog?.content,
            url: `https://codecommunitymusic.vercel.app/forum/${blog?.slug}`,
            type: "article",
            publishedTime: blog?.created_at,
            authors: [blog?.author],
            images: [
                {
                    url: `https://wiidgets.vercel.app/api/banner?title=${blog?.title}&bio=${blog?.content.slice(0, 50)}&twitter=${blog?.author}`,
                    width: 800,
                    height: 600,
                    alt: blog?.title,
                },
            ],
        },
    }
}


async function BlogSlug({ params }: BlogSlugProps) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/blogs/${params.slug}`)
    if (!data) {
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
                    <Image
                        src={`https://source.unsplash.com/1000x400/?${data?.data.blog.tags.join(',')}`}
                        className="w-full rounded-md shadow-md lg:rounded-2xl"
                        alt={data?.data?.blog.author.username!}
                        width="1000"
                        height="400"
                    />
                </div>
                <h1 className="mt-4 text-4xl font-semibold">
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
                <div className="grid my-10 lg:grid-cols-12">
                    <div className="w-1/4 lg:col-span-2">
                        <p className="text-sm font-light">
                            {data?.data.blog.slug}
                        </p>
                    </div>
                    <article className="w-full lg:col-span-10">
                        <h2>Table of Content</h2>
                        <ReactMarkdown
                            remarkPlugins={
                                [remarkGfm]
                            }
                            rehypePlugins={[
                                [rehypeSlug],
                                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                [rehypeHighlight, { ignoreMissing: true }],
                                rehypePrism,
                                [toc, {
                                    headings: "h1, h2, h3, h4, h5, h6",
                                    tight: true,
                                    className: "toc",
                                    slug: (text: String) => text.toLowerCase().replace(/\s/g, "-"),
                                    params: {
                                        depth: 3,
                                    },
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