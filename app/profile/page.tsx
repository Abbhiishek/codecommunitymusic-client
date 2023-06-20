'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Projects from "@/components/user/Portfolio/Projects";
import Stats from "@/components/user/Portfolio/Stats";
import HeaderBar from "@/components/user/userHeaderBar";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const router = useRouter();
    const { data: user, isLoading } = useGetSessionUser();
    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin" size={64} />
        </div>
    )
    if (!user) return (
        router.push('/login')
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