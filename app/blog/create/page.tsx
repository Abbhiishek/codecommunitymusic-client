"use client"


import Editor from "@/components/blog/Editor"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { nanoid } from "nanoid"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import * as z from "zod"
const PostValidator = z.object({
    title: z
        .string()
        .min(3, {
            message: 'Title must be at least 3 characters long',
        })
        .max(128, {
            message: 'Title must be less than 128 characters long',
        }),
    content: z.any(),
    tags: z.array(z.string()).max(5, {
        message: 'You can only add up to 5 tags',
    }),
    is_draft: z.boolean(),
    is_published: z.boolean(),
})


const Page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { data: user, isLoading } = useGetSessionUser()
    const [title, setTitle] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('title') || "" : "")
    const [tags, setTags] = useState<string[]>(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tags') || "[]") : []
    )
    const [content, setContent] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('content') || "" : "")
    const [isdraft, setIsDraft] = useState<boolean>(true)
    const [isposting, setIsPosting] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tags = localStorage.getItem('tags')
            if (tags) {
                setTags(JSON.parse(tags))
            }
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('title', title)
        localStorage.setItem('tags', JSON.stringify(tags))
        localStorage.setItem('content', content)
        localStorage.setItem('isdraft', JSON.stringify(isdraft))
    }, [title, tags, content, isdraft])



    const { mutate: createPost } = useMutation({
        mutationFn: async ({
            title,
            content,
            tags,
            is_draft,
            is_published,
        }: {
            title: string,
            content: string,
            tags: string[],
            is_draft: boolean,
            is_published: boolean,
        }) => {
            const uniquestring = nanoid(4);
            // make slug less than 50 characters
            const slug = `${title.slice(0, 30).toLowerCase()
                .trim()
                .replace(/ /g, "-")
                .replace(/[^a-z0-9-_]/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/\s+/g, "-")
                }${uniquestring}`
            console.log(slug)
            const payload = { title, content, tags, is_draft, is_published, slug }
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/blogs`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            })
            setIsPosting(false)
            return data
        },
        onError: () => {
            setIsPosting(false)
            return toast({
                title: 'Something went wrong.',
                description: 'Your post was not published. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            // turn pathname /r/mycommunity/submit into /r/mycommunity
            localStorage.removeItem('title')
            localStorage.removeItem('tags')
            localStorage.removeItem('content')
            localStorage.removeItem('isdraft')
            const newPathname = pathname.split('/').slice(0, -1).join('/')
            router.push(newPathname)
            router.refresh()
            return toast({
                description: 'Your post has been published.',
            })
        },
    })


    if (isLoading) {
        return (
            <>
                <Skeleton className="w-full h-60" />
            </>
        )
    }


    if (!user) {
        toast({
            title: 'You must be logged in to create a post.',
            variant: 'destructive',
        })
        router.push('/login')
    }

    async function onSubmitPublic() {
        setIsPosting(true)
        const result = PostValidator.safeParse({
            title,
            content,
            tags,
            is_draft: isdraft,
            is_published: !isdraft,
        })
        if (!result.success) {
            return toast({
                title: 'Something went wrong.',
                description: result.error.errors[0].message,
                variant: 'destructive',
            })
        }
        const payload = { title, content, tags, is_published: true, is_draft: false }
        createPost(payload)
    }
    async function onSubmitPrivate() {
        setIsPosting(true)
        const result = PostValidator.safeParse({
            title,
            content,
            tags,
            is_draft: isdraft,
            is_published: !isdraft,
        })
        if (!result.success) {
            return toast({
                title: 'Something went wrong.',
                description: result.error.errors[0].message,
                variant: 'destructive',
            })
        }
        const payload = { title, content, tags, is_published: false, is_draft: true }
        createPost(payload)
    }

    return (
        <div className="flex flex-col items-start gap-6">
            {/* form */}
            <div className="grid w-full grid-cols-1 gap-4 lg:h-[200px] lg:grid-cols-10">
                <Editor
                    title={title}
                    tags={tags}
                    content={content}
                    isdraft={isdraft}
                    setTitle={setTitle}
                    setTags={setTags}
                    setContent={setContent}
                    setIsDraft={setIsDraft}
                />
                <div className='w-full lg:col-span-3'>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Metadata</AccordionTrigger>
                            <AccordionContent>
                                <Label>Title : </Label>
                                <span className="italic font-semibold">
                                    {title}
                                </span>
                                <br />
                                <Label>Tags : </Label>
                                <span className="italic font-semibold">
                                    {tags.map((tag) => (
                                        <Badge className="mr-2" key={tag}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </span>
                                <br />
                                <Label>Blog Display Image</Label>
                                <span className="block italic">
                                    we will use the first tag to find a suitable image for your blog...
                                </span>
                                <div className="object-cover rounded-2xl">
                                    <Image
                                        src={`https://source.unsplash.com/1000x400/?${tags.join(',')}`}
                                        className="w-full rounded-md shadow-md lg:rounded-2xl"
                                        alt={user?.data.username!}
                                        width="1000"
                                        height="400"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex items-center justify-between w-full gap-2 p-2 border-2 rounded-lg border-zinc-200 lg:flex-col">
                        <Button
                            className="w-full"
                            disabled={isposting}
                            onClick={async () => {
                                await onSubmitPublic()
                            }}
                        >
                            Publish Blog
                            {isposting && <Loader2 className="ml-2 animate-spin" />}
                        </Button>
                        <Button
                            className="w-full"
                            disabled={isposting}
                            onClick={async () => {
                                await onSubmitPrivate()
                            }}
                            variant={"secondary"}
                        >
                            Save as Draft
                            {isposting && <Loader2 className="ml-2 animate-spin" />}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page