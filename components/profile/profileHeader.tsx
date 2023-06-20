import { User } from "@/types/User";
import { Minus, Verified } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


export default function ProfileHeader({ data }: { data: User }) {
    return (
        <div className="px-2 pb-5 lg:pb-20 lg:px-44">
            <div className="relative flex justify-center rounded-lg lg:h-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={data?.banner_pic}
                    className="object-cover w-full rounded-lg lg:h-full"
                    alt="cover"
                />
                <div className="absolute -bottom-16">
                    <Avatar className="w-40 h-40 border-4 border-white rounded-full shadow-lg lg:h-52 lg:w-52" >
                        <AvatarImage src={data?.profile_pic}
                            alt={data?.username}
                        />
                        <AvatarFallback>{data?.username}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-20">
                <h1 className="text-xl font-bold text-center lg:text-3xl ">{data?.first_name} {data?.last_name}</h1>
                <div className="flex gap-3">
                    <span className="text-gray-500 ">@{data?.username}
                        {' '}
                        {data?.is_verified && <Verified className="inline-block w-5 h-5 text-green-500" />}
                    </span>
                    <span className="text-gray-400 ">Karma: {data?.karma}</span>
                </div>
                <span className="flex flex-row items-center justify-center gap-2 mt-2">
                    <span className="text-gray-400 ">{data?.followers?.length} Followers</span>
                    <Minus className="w-5 h-5 text-gray-400 rotate-90" />
                    <span className="text-gray-400 ">{data?.following?.length} Following</span>
                </span>
                <Link href={'/setting'} passHref>
                    <Button
                        variant="default"
                        className="px-5 py-2 mt-2 text-sm font-bold rounded-full shadow-lg lg:text-base lg:px-10 lg:py-3 "
                    >
                        Edit Profile
                    </Button>
                </Link>
                <span className="px-2 pt-3 text-gray-400 lg:text-center lg:w-3/4">
                    {data?.bio}
                    {" "}
                    <br />
                    <br />
                    <span className="flex flex-wrap items-center justify-start gap-2 text-gray-500">
                        <p>Skills:</p> {" "}
                        {data?.skills?.map((skill, index) => (
                            <span key={index} className="text-gray-500">
                                #{skill}
                                {index !== data?.skills.length - 1 && ", "}
                            </span>
                        ))}
                    </span>
                    <span className="flex flex-wrap items-center justify-start gap-2 text-gray-500">
                        <p>Interests:</p> {" "}
                        {data?.interests?.map((interest, index) => (
                            <span key={index} className="text-gray-500">
                                @{interest}
                                {index !== data?.interests.length - 1 && ", "}
                            </span>
                        ))}
                    </span>
                </span>
            </div>
            <Separator className="mt-5" />
        </div>
    )
}