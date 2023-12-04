import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from "rehype-slug";
import remarkGfm from 'remark-gfm';



const MarkdownLite = ({ text, isuser }: { text: string, isuser: boolean }) => {


    console.log("data from openai", text)
    const linkRegex = /\[(.+?)\]\((.+?)\)/g
    const codeRegex = /`([^`]+)`/g;
    const tableRegex = /\|(.+)\|/g;
    const htmlTagRegex = /<([^>]+)>/g;
    const parts = []

    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
        const [fullMatch, linkText, linkUrl] = match
        const matchStart = match.index
        const matchEnd = matchStart + fullMatch.length

        if (lastIndex < matchStart) {
            parts.push(text.slice(lastIndex, matchStart))
        }

        parts.push(
            <Link
                target='_blank'
                rel='noopener noreferrer'
                className='break-words underline underline-offset-2 text-blue-600'
                key={linkUrl}
                href={linkUrl}>
                {linkText}
            </Link>
        )

        lastIndex = matchEnd
    }
    while ((match = codeRegex.exec(text)) !== null) {
        const [fullMatch, codeText] = match;
        const matchStart = match.index;
        const matchEnd = matchStart + fullMatch.length;

        if (lastIndex < matchStart) {
            parts.push(text.slice(lastIndex, matchStart));
        }

        parts.push(
            // <code key={matchStart} className='inline-block p-1'>
            //     {codeText}
            // </code>
            <article>
                <code key={matchStart} className='inline-block  w-full px-1 language-'>
                    {codeText}
                </code>
            </article>
        );

        lastIndex = matchEnd;
    }
    while ((match = tableRegex.exec(text)) !== null) {
        const [fullMatch, tableContent] = match;
        const matchStart = match.index;
        const matchEnd = matchStart + fullMatch.length;

        if (lastIndex < matchStart) {
            parts.push(text.slice(lastIndex, matchStart));
        }

        // Process the table content as needed and add it to the parts array
        // You can customize the rendering of the table content based on your requirements.

        lastIndex = matchEnd;
    }

    while ((match = htmlTagRegex.exec(text)) !== null) {
        const [fullMatch, htmlTag] = match;
        const matchStart = match.index;
        const matchEnd = matchStart + fullMatch.length;

        if (lastIndex < matchStart) {
            parts.push(text.slice(lastIndex, matchStart));
        }

        // Process HTML tags as needed and add them to the parts array
        // You can customize the rendering of HTML tags based on your requirements.

        lastIndex = matchEnd;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex))
    }

    return (
        <>
            <article className="w-full lg:col-span-10 ">
                <span>
                    {!isuser && "🤖"}
                </span>
                <ReactMarkdown
                    remarkPlugins={
                        [remarkGfm]
                    }
                    rehypePlugins={[
                        [rehypeSlug],
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        [rehypeHighlight, { ignoreMissing: true }],
                        rehypePrism,
                    ]}
                >
                    {text}
                </ReactMarkdown>
            </article>
        </>
    )
}

export default MarkdownLite
