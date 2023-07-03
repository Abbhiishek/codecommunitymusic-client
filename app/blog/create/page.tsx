"use client"
import Editor from "@/components/blog/Editor"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { nanoid } from "nanoid"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
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
    const [title, setTitle] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState<string>("")
    const [isdraft, setIsDraft] = useState<boolean>(true)
    const [isposting, setIsPosting] = useState<boolean>(false)
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
            <div className="grid w-full grid-cols-1 gap-4 lg:h-[400px] lg:grid-cols-10">
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
                    <div className="flex items-center justify-between w-full gap-2 p-2 border-2 rounded-lg border-zinc-200 lg:flex-col">
                        <Button
                            className="w-full"
                            disabled={isposting}
                            onClick={async () => {
                                await onSubmitPublic()
                            }}
                        >
                            Publish Blog
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
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page