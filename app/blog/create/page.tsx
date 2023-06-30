"use client"
import Editor from "@/components/blog/Editor"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { nanoid } from "nanoid"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"


export const PostValidator = z.object({
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
export type PostCreationRequest = z.infer<typeof PostValidator>

const Page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [title, setTitle] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState<string>("")
    const [isdraft, setIsDraft] = useState<boolean>(false)


    const { mutate: createPost } = useMutation({
        mutationFn: async ({
            title,
            content,
            tags,
            is_draft,
            is_published,
        }: PostCreationRequest) => {
            const uniquestring = nanoid(4);
            const slug = `${title.toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^a-z0-9-_]/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/\s+/g, "-")
                }-${uniquestring}`
            const payload = { title, content, tags, is_draft, is_published, slug }
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/blogs`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                }
            })
            return data
        },
        onError: () => {
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

    async function onSubmit() {

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
        const payload = { title, content, tags, is_published: !isdraft, is_draft: isdraft }
        createPost(payload)
    }

    return (
        <div className="flex flex-col items-start gap-6">
            <Label>
                Publish your Blog
            </Label>
            {/* form */}
            <div className="grid w-full grid-cols-10 gap-4">
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
                <div className='flex flex-col w-full col-span-2 gap-2'>
                    {title}
                    <Button className='w-full'
                        onClick={() => {
                            console.log("publishing blog")
                            setIsDraft(false)
                            onSubmit()
                        }}
                    >
                        Publish Blog
                    </Button>
                    <Button
                        onClick={() => {
                            console.log("saving as draft")
                            setIsDraft(true)
                            onSubmit()
                        }}
                        className='w-full bg-yellow-500 hover:bg-yellow-600' >
                        Save as Draft
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page