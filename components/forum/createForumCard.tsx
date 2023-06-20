'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Skills } from "@/config/skills"
import { cn } from "@/lib/utils"
import "@uiw/react-markdown-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import "@uiw/react-md-editor/markdown-editor.css"
import axios from "axios"
import { Check, ChevronsUpDown } from "lucide-react"
import { nanoid } from 'nanoid'
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as z from "zod"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { toast } from "../ui/use-toast"
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


function CreateForumCard() {
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState("**Describe how devs can assist you**")
    const [tags, setTags] = useState<string[]>([])
    const [error, setError] = useState<z.ZodIssue[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)


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
        const uniquestring = nanoid(4);
        console.log(uniquestring)
        // replace spaces, dots and questions marka with dashes and make lowercase
        const slug = `${title.toLowerCase().replace(
            /[\s.?]+/g,
            "-"
        )}-${uniquestring}`
        console.log(slug)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forums`, {
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
        setIsLoading(false)
        setError([])
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="">
                    Ask a question
                </Button>
            </SheetTrigger>
            <SheetContent position={"right"} size={'content'} className="h-full">
                <SheetHeader>
                    <SheetTitle className="mt-10">Got stuck on something? Ask a question!
                    </SheetTitle>
                    <SheetDescription>
                        <p>
                            Ask a question and get help from the community.
                        </p>
                        <span>
                            {error.map((err, index) => {
                                return (
                                    <p key={index} className="text-red-500">
                                        {err.message}
                                    </p>
                                )
                            }
                            )}
                        </span>

                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <div>
                    <ScrollArea className="h-[400px] lg:h-[600px] p-2">
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
                                <div className="">
                                    <MarkdownEditor
                                        value={description}
                                        onChange={(value) => setDescription(value)}
                                        className="h-full"
                                        enableScroll={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
                <SheetFooter className="flex justify-between gap-2 mt-10">
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            type="submit">Cancel</Button>
                    </SheetClose>
                    <Button
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >{
                            isLoading ? "posting..." : "Post"
                        }
                    </Button>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    )
}

export default CreateForumCard