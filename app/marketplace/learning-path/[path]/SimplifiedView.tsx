"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import YouTube from "@/components/youtubecard/YoutubeCard";
import { Course } from "@/types/Course";
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";
import remarkGfm from 'remark-gfm';



function SimplifiedView({ courses }: { courses: Course[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {courses.map((course, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{course.title}</AccordionTrigger>
                    <AccordionContent>
                        <article className="w-full">
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
                                {course.description}
                            </ReactMarkdown>
                        </article>
                        <h2 className="text-2xl font-extrabold capitalize lg:text-3xl">Video Resources</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                            {course.resources.map((video, index) => (
                                <div key={index} className="p-2">
                                    <YouTube id={video} />
                                </div>
                            ))
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default SimplifiedView