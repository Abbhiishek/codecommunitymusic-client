'use client'

import { useGetSessionUser } from "@/hooks/user/get-current-user"
import { User } from "@/types/User"
import axios from "axios"
import { BadgeAlertIcon, Bookmark, CalendarDays, Globe, Loader2, LucideGithub, LucideLinkedin, LucideTwitter, MapPin, Verified } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { toast } from "../ui/use-toast"

function HeaderBar(
    { user }: { user: User }
) {

    const { data, isLoading, refetch } = useGetSessionUser();



    const [isFollowing, setIsFollowing] = useState(user.followers.includes(data?.data.username!));
    const [followers, setFollowers] = useState(user.followers.length);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }



    const handleFollow = async () => {

        await refetch();

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/followuser/${user.username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('session_token')}`
            }
        })

        if (res.status === 200) {
            if (res.data.action === "followed") {
                setFollowers(followers + 1);
            } else if (res.data.action === "unfollowed") {
                setFollowers(followers - 1);
            }
            setIsFollowing(!isFollowing);
            toast({
                title: "Success",
                description: res.data.message,
            })
        } else {
            toast({
                title: "Error",
                description: `You are already following ${user.username}`,
            })
        }
    }


    return (
        <div className='w-full'>
            <div className='relative flex items-center justify-between gap-3'>
                <Image src={'/userbanner.jpg'} alt="cover image" className='w-full h-32 rounded-t-2xl lg:h-72'
                    width={1440} height={360}
                />
            </div>
            <div className='flex flex-col justify-center w-full gap-5 lg:px-8 lg:flex-row'>
                <div className='flex -translate-y-24 max-h-3'>
                    <Avatar
                        className="lg:w-72 lg:h-72 w-36 h-36"
                    >
                        <AvatarImage src={user.profile_pic} />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-end w-full p-0 pt-6 lg:pl-6'>
                    <div className='flex flex-row items-center justify-center w-full gap-2 lg:justify-start'>
                        <h1 className='text-xl font-bold lg:text-4xl font-inter'>{user.display_name || user.first_name}</h1>
                        <Badge variant={"default"} aria-label="verified">
                            {user.is_verified ? <Verified className="text-green-700" /> : <BadgeAlertIcon />}
                        </Badge>
                    </div>
                    <div className='flex flex-row items-center justify-center w-full gap-2 lg:justify-start'>
                        <p className='font-light'>@{user.username}</p>
                        <Separator orientation="vertical" />
                        <p>Karma: {user.karma}</p>
                    </div>
                    <div className='flex flex-col '>
                        <span className='text-base font-light leading-6 text-inter'>{user.profession}</span>
                        <div className='flex items-center justify-start gap-2'>
                            <MapPin className='w-4 h-4' />
                            <span className='text-base font-light leading-6 text-inter'>{user.location || "Over the Cloud ☁️"}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.skills.map((tech, index) => (
                                <Badge key={index}
                                    variant={"default"}
                                    className="lg:py-1 lg:px-4"
                                >{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className='mt-4 text-base font-light leading-6 text-justify'>{user.bio}</p>
                            <span className="flex flex-row flex-wrap gap-3">
                                <span>
                                    <span className="font-bold">{followers}</span>
                                    <span className="font-light"> Followers</span>
                                </span>
                                <span>
                                    <span className="font-bold">{user.following.length}</span>
                                    <span className="font-light"> Followings</span>
                                </span>
                                <span className="flex items-center justify-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span className="">Joined {
                                        new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        })
                                    }</span>
                                </span>
                            </span>
                        </div>
                        <hr className='my-6' />
                        <div className='flex flex-col items-center justify-between gap-3 my-6 lg:flex-row'>
                            <div className='flex w-full gap-2'>
                                {
                                    user?.twitter && (
                                        <Link href={user?.twitter} passHref >
                                            <Badge className='px-2 py-2 rounded-md '>
                                                <LucideTwitter className="w-4 h-4" />
                                            </Badge>
                                        </Link>
                                    )
                                }
                                {
                                    user?.linkedin && (
                                        <Link href={user?.linkedin} passHref >
                                            <Badge className='px-2 py-2 rounded-md '>
                                                <LucideLinkedin className="w-4 h-4" />
                                            </Badge>
                                        </Link>
                                    )
                                }
                                {
                                    user?.github && (
                                        <Link href={user?.github} passHref >
                                            <Badge className='px-2 py-2 rounded-md '>
                                                <LucideGithub className="w-4 h-4" />
                                            </Badge>
                                        </Link>
                                    )
                                }
                                {
                                    user?.website && (
                                        <Link href={user?.website} passHref >
                                            <Badge className='px-2 py-2 rounded-md '>
                                                <Globe className="w-4 h-4" />
                                            </Badge>
                                        </Link>
                                    )
                                }
                            </div>
                            <div className='flex items-center justify-end w-full gap-1'>
                                <Button
                                    onClick={() => {
                                        // save the url to clipboard
                                        navigator.clipboard.writeText(window.location.href)
                                    }}
                                >
                                    <Bookmark className='w-5 h-5' />
                                </Button>
                                {
                                    data?.data.username === user.username ? (
                                        <Link href="/setting" passHref>
                                            <Button variant='default'>Edit Profile</Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant='default'
                                            onClick={handleFollow}
                                        >
                                            {isFollowing ? "Unfollow" : "Follow"}
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar