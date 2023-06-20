'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Projects from "@/components/user/Portfolio/Projects";
import Stats from "@/components/user/Portfolio/Stats";
import HeaderBar from "@/components/user/userHeaderBar";
import { useGetUser } from "@/hooks/user/getuser-username";
import { Loader2 } from "lucide-react";

interface Props {
    params: {
        username: string
    }
}

function ProfilePage({ params }: Props) {
    const { data: user, isLoading } = useGetUser(params.username);
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }
    if (!user) return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <span>User Not Found</span>
        </div>
    )

    return (
        <div className="container min-h-screen mt-10">
            <HeaderBar user={user?.data!} />
            <Tabs defaultValue="portfolio" className="w-full min-h-screen mt-10">
                <TabsList className="grid w-full grid-cols-2 gap-3">
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio">
                    <Stats karma={user.data.karma} />
                    <Projects username={user.data.username} />
                </TabsContent>
                <TabsContent value="resume">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
}


export default ProfilePage;