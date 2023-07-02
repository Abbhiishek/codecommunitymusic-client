import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";


export const revalidate = 20;

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
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list/blogs`)
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