'use client'


import { Skills } from "@/config/skills"
import { cn } from "@/lib/utils"
import '@/styles/editor.css'
import "@uiw/react-markdown-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import "@uiw/react-md-editor/markdown-editor.css"
import { Check, ChevronsUpDown } from "lucide-react"
import dynamic from "next/dynamic"
import TextareaAutosize from 'react-textarea-autosize'
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from '../ui/separator'


const MarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false }
);


const Editor = ({
    title,
    tags,
    content,
    isdraft,
    setTitle,
    setTags,
    setContent,
    setIsDraft,
}: {
    title: string
    tags: string[]
    content: string
    isdraft: boolean
    setTitle: Function
    setTags: Function
    setContent: Function
    setIsDraft: Function

}) => {



    return (
        <div className='w-full p-4 border rounded-lg lg:col-span-7 border-zinc-200'>
            <form
                id='blog-post-form'
                className='w-full'
            >
                <div className='w-full prose prose-stone dark:prose-invert'>
                    <TextareaAutosize
                        value={title}
                        maxLength={100}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Write a title for your post'
                        className='w-full overflow-hidden text-5xl font-bold bg-transparent appearance-none resize-none focus:outline-none'
                    />
                    <Separator />
                    <div className="z-50 my-2">
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
                                        &&
                                        <div className="flex flex-wrap gap-1">
                                            {tags.map((interest) => (
                                                <Badge key={interest}>{interest}</Badge>
                                            ))
                                            }
                                        </div>
                                    }
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
                                                        setTags((prev: any) =>
                                                            prev?.includes(interest)
                                                                ? prev.filter((i: any) => i !== interest)
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
                        <span className='text-xs text-gray-500 dark:text-gray-400'
                        >
                            Choose up to 5 tags that will help categorize your post.
                        </span>
                    </div>
                    <Separator />
                    <ScrollArea className="h-80 lg:h-full">
                        <MarkdownEditor
                            value={content}
                            onChange={(value) => setContent(value)}
                            className=" h-[600px] lg:text-lg lg:prose-lg dark:prose-invert"
                            spellCheck={true}
                            enableScroll={false}
                            placeholder="Write your post here..."
                        />
                    </ScrollArea>
                </div>
            </form>
        </div>
    )

}

export default Editor


