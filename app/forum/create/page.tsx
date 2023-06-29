"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Skills } from "@/config/skills";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { cn } from "@/lib/utils";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import axios from "axios";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(10, {
        message: "Title must be at least 10 characters long"
    }),
    description: z.string().min(150, {
        message: "Description must be at least 150 characters long"
    }),
    tags: z.array(z.string()).min(1, {
        message: "You must select at least 1 tag"
    }).max(5, {
        message: "You can only select up to 5 tags"
    })
})


const MarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false },
);



function Page() {
    const router = useRouter()
    const { data, isLoading: loading } = useGetSessionUser()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState("**Describe how devs can assist you**")
    const [tags, setTags] = useState<string[]>([])
    const [error, setError] = useState<z.ZodIssue[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)


    if (loading) return (
        <div>
            <div className="flex items-center justify-center w-full h-screen">
                <Loader size={50} className="animate-spin" />
            </div>
        </div>
    )

    if (!data) {
        toast({
            title: "Error",
            description: "You must be logged in to create a forum",
        })
        router.push("/login")
    }


    const handleSubmit = async () => {
        const result = schema.safeParse({
            title,
            description,
            tags
        })

        if (!result.success) {
            setError(result.error.issues)
            return
        }
        setError([])
        setIsLoading(true)
        setIsSubmitted(true)
        const uniquestring = nanoid(4);
        console.log(uniquestring)
        // replace title and make it url friendly
        const slug = `${title.toLowerCase().replace(
            /[^a-z0-9]+/g,
            "-",
        )}-${uniquestring}`
        console.log(slug)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/forums`, {
            title,
            description,
            tags,
            slug
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session_token')}`
            }
        })

        if (res.status === 201) {
            toast({
                title: "Success",
                description: "Your question has been posted",
            })
            setIsSubmitted(true)
            setTitle('')
            setDescription('')
            setTags([])
            router.push(`/forum/${slug}`)

        } else {
            toast({
                title: "Error",
                description: "Something went wrong",
            })
            setIsLoading(false)
        }
        setIsSubmitted(false)
        setIsLoading(false)
        setError([])
    }


    return (
        <div className="container">
            <div>
                <ScrollArea className="h-[400px] lg:h-[600px] p-4">

                    <div className="py-10">
                        <Label>Title
                        </Label>
                        <Input
                            type="text"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
                            placeholder="What's your question?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="z-50 my-10">
                            <Label htmlFor="skills" className="text-xl">Tags</Label>
                            <Popover modal>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "justify-between w-full h-full text-left font-normal p-2",
                                            !tags && "text-muted-foreground"
                                        )}
                                    >
                                        {tags
                                            ?
                                            <div className="flex flex-wrap gap-1">
                                                {tags.map((interest) => (
                                                    <Badge key={interest}>{interest}</Badge>
                                                ))
                                                }
                                            </div>

                                            : "Select Interest"}
                                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 ">
                                    <Command>
                                        <CommandInput placeholder="Search ..." />
                                        <CommandEmpty>No Tags found.</CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="h-64">
                                                {Skills?.map((interest: string) => (
                                                    <CommandItem
                                                        value={interest}
                                                        key={interest}
                                                        onSelect={() => {
                                                            setTags((prev) =>
                                                                prev?.includes(interest)
                                                                    ? prev.filter((i) => i !== interest)
                                                                    : [...prev, interest]
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                tags?.includes(interest)
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {interest}
                                                    </CommandItem>
                                                ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>
                                Description
                            </Label>
                            <div className="mt-4">
                                <MarkdownEditor
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    className="h-[600px]"
                                    enableScroll={true}
                                />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <span>
                {error.map((err) => (
                    <p key={err.code} className="text-red-500">{err.message}</p>
                ))}
            </span>
            <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full mt-4"
            >{
                    isLoading ? "posting..." : "Post Question 🚀"
                }
            </Button>
        </div>
    )
}

export default Page