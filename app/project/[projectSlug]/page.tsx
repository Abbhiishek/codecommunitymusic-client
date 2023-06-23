'use client'

import AuthorHoverTag from "@/components/project/AuthorHoverTag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useGetProject } from "@/hooks/project/get-project";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { ResourceNotFoundError } from "@/lib/exceptions";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BookmarkIcon, Eye, GithubIcon, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectProps {
    params: {
        projectSlug: string
    }
}

function Project({ params }: ProjectProps) {
    const { data, isLoading, } = useGetProject(params.projectSlug)
    const { data: user } = useGetSessionUser()
    const [projectliked, setProjectLiked] = useState<boolean>()
    const [projectbookmarked, setProjectBookmarked] = useState<boolean>()


    useEffect(() => {
        if (data) {
            if (user) {
                if (data.data.upvotes.includes(user.data.username)) {
                    setProjectLiked(true)
                }
                if (data.data.bookmarks.includes(user.data.username)) {
                    setProjectBookmarked(true)
                }
            }
        }
    }), []

    const likeprojectmutation = useMutation({
        mutationKey: ["like"],
        mutationFn: likeProject,
        cacheTime: 0,
    })

    const bookmarkprojectmutation = useMutation({
        mutationKey: ["bookmark", data?.data.slug],
        mutationFn: bookmarkProject,
        cacheTime: 0,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        throw ResourceNotFoundError;
    }

    const handlelike = () => {
        if (user) {
            likeprojectmutation.mutate(data.data.slug)
        }
    }

    const handleBookmark = () => {
        if (user) {
            bookmarkprojectmutation.mutate(data.data.slug)
        }
    }


    async function likeProject(slug: string) {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/project/${slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`,
                },
            })
            if (data.action === "liked") {
                console.log("liked")
                setProjectLiked(true)
            }
            else if (data.action === "unliked") {
                console.log("unliked")
                setProjectLiked(false)
            }
            toast({
                title: data.message,
                description: data.description,
            })
        }
        catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                })
            }
        }
    }


    async function bookmarkProject(slug: string) {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmark/project/${slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`,
                },
            })
            console.log(data)
            if (data.action === "unbookmarked") {
                setProjectBookmarked(false)

            }
            else if (data.action === "bookmarked") {
                setProjectBookmarked(true)

            }
            toast({
                title: data.message,
                description: data.description,
            })

        }
        catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                })
            }
        }
    }


    return (
        <div className="container flex flex-col mt-2">
            <div className="object-cover rounded-2xl">
                <img
                    src={`https://wiidgets.vercel.app/api/banner?title=${data?.data?.title}&bio=${data.data.subtitle}&twitter=${data.data.author}`}
                    className="w-full rounded-md shadow-md lg:rounded-2xl"
                    alt={data.data.title} />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <span className="pt-10 font-mono text-5xl font-semibold">
                        {data.data.title}
                    </span>
                    <span className="italic font-extralight">
                        {data.data.subtitle}
                    </span>
                    <span>
                        Made by <AuthorHoverTag author={data.data.author} />
                    </span>
                    <span className="font-mono text-sm font-extralight">
                        Added on {new Date(data.data.created_at).toDateString()}
                    </span>
                </div>
                <div className="flex flex-col gap-2 pt-5 lg:flex-row">
                    <Button className="flex flex-col gap-2" variant={'secondary'}
                        onClick={handlelike}
                    >
                        <Heart
                            className={`${projectliked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                        />
                        {/* <span>{data.data.upvotes.length}</span> */}
                    </Button>
                    <Button className="flex flex-col gap-2" variant={'secondary'}
                        onClick={handleBookmark}
                    >
                        <BookmarkIcon
                            className={`${projectbookmarked ? "fill-white" : "text-gray-500"}`}
                        />
                    </Button>
                    <Link href={data.data.githubLink} target="_blank">
                        <Button>
                            <GithubIcon />
                        </Button>
                    </Link>
                    {
                        data.data.demoLink &&
                        <Link href={data.data.demoLink} target="_blank">
                            <Button>
                                <Eye />
                            </Button>
                        </Link>
                    }

                </div>
            </div>
            <div className="flex flex-col justify-between gap-5 mt-10 lg:flex-row">
                <div className="flex flex-col gap-2 basis-3/4">
                    <span className="font-mono text-2xl font-semibold">
                        Description
                    </span>
                    <span>
                        {data.data.description}
                    </span>
                </div>
                <div className=" basis-1/4">
                    <div className="flex flex-col gap-2 px-4 py-2 border-4 rounded-xl">
                        <span className="font-mono text-2xl font-semibold">
                            Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {data.data.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <span className="mt-4 font-mono text-2xl font-semibold">
                            Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {data.data.tech_stack.map((stack) => (
                                <Badge key={stack} variant="secondary">
                                    {stack}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-10 " />
        </div>
    )
}

export default Project