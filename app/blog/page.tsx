import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const revalidate = 20;



export const metadata: Metadata = {
    title: 'Blogs | Code Community Music',
    abstract: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
    category: 'Projects',
    creator: 'Code Community Music',
    publisher: 'Code Community Music',
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Code Community Music',
        description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
        creator: '@CodeCommMusicHQ',
        images: ['https://pbs.twimg.com/profile_images/1646354688378552320/v7MYAeHr_400x400.jpg'],
    },
    description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
    keywords: ['projects', 'code community music', 'code community', 'code', 'community', 'music', 'developers', 'designers', 'project', 'developer', 'designer'],
    openGraph: {
        title: 'Projects | Code Community Music',
        description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
        type: 'website',
        url: 'https://codecommunitymusic.vercel.app/blog',
        locale: 'en',
    },

}

interface BlogPost {
    id: number;
    appreciators: User[];
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    is_published: boolean;
    is_draft: boolean;
    author: User;
}

interface User {
    username: string;
    display_name: string | null;
    profile_pic: string;
    created_at: string;
    karma: number;
}


async function BlogPage() {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/blogs`)
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="gap-2">
                    <h1 className="text-4xl font-bold">Blog</h1>
                    <span className="text-gray-500">A collection of blogs written by our community members</span>
                </div>
                <div>
                    <Button
                        variant={"default"}
                        size={"sm"}
                    >
                        <Link href={'/blog/create'}>
                            <PlusCircleIcon className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>

            <Separator />
            <div className="grid gap-3 px-2 mt-10 lg:grid-cols-4 md:grid-cols-2 justify-items-center place-content-center">
                {data.data.map((blog: BlogPost, index: number) => (
                    <BlogCard key={index}
                        blogslug={blog.slug}
                        tag={blog.tags}
                        title={blog.title}
                        body={blog.content}
                        author={blog.author.display_name || blog.author.username}
                        date={blog.created_at}
                        blogImage={blog.author.profile_pic}
                        authorImage={blog.author.profile_pic}
                        readingTime={blog.content.length.toString()}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default BlogPage