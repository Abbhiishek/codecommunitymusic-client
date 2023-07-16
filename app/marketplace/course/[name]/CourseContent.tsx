"use client"

import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";
import remarkGfm from 'remark-gfm';


function CourseContent({ content }: { content: string }) {
    return (
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
            {content}
        </ReactMarkdown>
    )
}

export default CourseContent