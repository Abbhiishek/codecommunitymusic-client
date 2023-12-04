import ForumCard from "@/components/forum/forumCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IForumData } from "@/types/Forum"
import axios from "axios"
import { Metadata } from 'next'
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Forum | Code Community Music',
    description: 'Ask Questions, Share your knowledge, and get answered by other devs 😎.',
    abstract: 'Ask Questions, Share your knowledge, and get answered by other devs 😎.',
    keywords: ['forum', 'community', 'code', 'music', 'questions', 'knowledge', 'answered', 'devs'],
    openGraph: {
        title: 'Forum | Code Community Music',
        description: 'Ask Questions, Share your knowledge, and get answered by other devs 😎.',
        url: 'https://codecommunitymusic.vercel.app/forum',
        type: 'website',
        images: [
            {
                url: 'https://wiidgets.vercel.app/api/banner?title=Forum%20%7C%20Code%20Community%20Music&bio=Ask%20Questions%2C%20Share%20your%20knowledge%2C%20and%20get%20answered%20by%20other%20devs%20%F0%9F%98%8E.&twitter=codecomusic',
                width: 800,
                height: 600,
                alt: 'Forum | Code Community Music',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@CodeCommMusicHQ',
        creator: '@CodeCommMusicHQ',
        title: 'Forum | Code Community Music',
        description: 'Ask Questions, Share your knowledge, and get answered by other devs 😎.',
        images: [
            {
                url: 'https://pbs.twimg.com/profile_images/1646354688378552320/v7MYAeHr_400x400.jpg',
                width: 800,
                height: 600,
                alt: 'Forum | Code Community Music',
            },
        ],
    },

}

export const revalidate = 60;

async function ForumPage() {
    const { data: forums, } = await axios.get(`${process.env.BACKEND_URL}/list/forums`)
    return (
        <div className="container flex flex-col gap-5 pt-10">
            <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
                <div className="justify-start w-full md:justify-end">
                    <p className="text-xl lg:text-4xl">Community Forum</p>
                    <span className="text-sm font-light text-gray-500">
                        Ask questions, share your knowledge, and get answered by other devs 😎.
                    </span>
                </div>
                <div className="flex items-end w-full md:justify-end">
                    <Link href={'/forum/create'}>
                        <Button>
                            Ask a question
                        </Button>
                    </Link>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-5">
                {forums?.data?.map((forum: IForumData, index: number) => {
                    return (
                        <ForumCard forum={forum} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default ForumPage