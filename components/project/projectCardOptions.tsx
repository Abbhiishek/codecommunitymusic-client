'use client'


import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { IProjectData } from "@/types/Project";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bookmark, Heart, Share2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";


interface IProjectCardProps {
    project: IProjectData;
}

const ProjectCardOptions = ({ project }: IProjectCardProps) => {
    const { data: user } = useGetSessionUser();
    const [likecount, setLikeCount] = useState<number>()
    const [isliking, setisliking] = useState<boolean>(false)
    const [projectliked, setProjectLiked] = useState<boolean>()
    const [bookmarkcount, setBookmarkCount] = useState<number>()
    const [isbookmarking, setisbookmarking] = useState<boolean>(false)
    const [projectbookmarked, setProjectBookmarked] = useState<boolean>()

    useEffect(() => {
        if (user) {
            if (project.upvotes.includes(user.data.username)) {
                setProjectLiked(true)
            }
            if (project.bookmarks.includes(user.data.username)) {
                setProjectBookmarked(true)
            }
            setBookmarkCount(project.bookmarks.length)
            setLikeCount(project.upvotes.length)
        }
    }, [])


    const likeprojectmutation = useMutation({
        mutationKey: ["like", project.slug, isliking, likecount, user?.data.username],
        mutationFn: likeProject,
        cacheTime: 0,
    })
    const bookmarkprojectmutation = useMutation({
        mutationKey: ["bookmark", project.slug, isbookmarking, bookmarkcount, user?.data.username],
        mutationFn: bookmarkProject,
        cacheTime: 0,
    })

    async function likeProject(slug: string) {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/like/project/${slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session_token")}`,
                },
            })
            console.log(data)
            if (data.action === "unliked") {
                setProjectLiked(false)
                setLikeCount(data.likecount)
            }
            else if (data.action === "liked") {
                setProjectLiked(true)
                setLikeCount(data.likecount)
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
                setBookmarkCount(data.bookmarkcount)
            }
            else if (data.action === "bookmarked") {
                setProjectBookmarked(true)
                setBookmarkCount(data.bookmarkcount)
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
    const handlelike = () => {
        setisliking(true)
        if (user) {
            likeprojectmutation.mutate(project.slug)
        }
        setisliking(false)
    }

    const handleBookmark = () => {
        setisbookmarking(true)
        if (user) {
            bookmarkprojectmutation.mutate(project.slug)
        }
        setisbookmarking(false)
    }
    return (
        <div className="w-full p-2 ">
            <div className="grid justify-center grid-cols-6 gap-2 content-evenly lg:gap-3 lg:grid-cols-9">
                <Button
                    disabled={isliking}
                    onClick={handlelike}
                    variant="secondary"
                    className="flex items-center justify-center col-span-3 gap-3 rounded-full"
                >
                    {
                        likecount
                    }
                    {
                        projectliked ? <Heart className="w-6 h-6 text-red-800 fill-red-800" />
                            : <Heart className="w-6 h-6 " />
                    }
                    {/* <Heart className="w-6 h-6 " /> */}
                </Button>
                <Button
                    onClick={handleBookmark}
                    variant="secondary"
                    className="flex items-center justify-center col-span-3 gap-3 rounded-full"
                >
                    {
                        bookmarkcount
                    }
                    {
                        projectbookmarked ? <Bookmark className="w-6 h-6 fill-white" />
                            : <Bookmark className="w-6 h-6 " />
                    }
                    {/* <Bookmark className="w-6 h-6 col-span-2" /> */}
                </Button>
                <Button
                    variant="secondary"
                    className="h-full col-span-3 rounded-full"
                >
                    <Share2Icon className="w-6 h-6 " />
                </Button>
                <Link href={`/project/${project.slug}`} className="col-span-9">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center w-full h-full col-span-9 gap-3 text-xs rounded-full md:text-base lg:col-span-9"
                    >
                        View Project <span aria-hidden="true"
                            className="lg:text-lg"
                        >{' '}&rarr;</span>
                    </Button>
                </Link>
            </div>
        </div>

    )
}


export default ProjectCardOptions;