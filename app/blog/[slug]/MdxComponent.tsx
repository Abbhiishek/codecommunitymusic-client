import "highlight.js/styles/atom-one-dark.css";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";
import remarkGfm from 'remark-gfm';



const MdxComponent = ({ content }: { content: string }) => {

    let mdxSource: any;

    useEffect(() => {
        async function loadHighlight() {
            mdxSource = await serialize(content, {
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        [rehypeHighlight],
                        rehypePrism,
                        [toc, {
                            headings: "h1, h2, h3, h4, h5, h6",
                            tight: true,
                            className: "toc",
                            slug: (text: String) => text.toLowerCase().replace(/\s/g, "-"),

                        }],
                    ],
                    remarkPlugins: [remarkGfm],
                },
            });

        }
        loadHighlight();
    }, [])


    return (
        <article className="w-3/4">
            <MDXRemote {...mdxSource} />
        </article>
    )
}

export default MdxComponent