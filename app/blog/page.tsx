import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";


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
                <div>
                    <h1 className="text-4xl font-bold">Blog</h1>
                    <p className="text-gray-500">A collection of blogs written by our community members</p>
                </div>
                <div>
                    <Button
                        variant={"default"}
                        size={"sm"}
                    >
                        <Link href={'/blog/create'}>Create Blog</Link>
                    </Button>
                </div>
            </div>

            <Separator />
            <div className="grid grid-cols-4">
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