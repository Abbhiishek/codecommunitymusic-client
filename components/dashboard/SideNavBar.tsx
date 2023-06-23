'use client'
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { BarChart2, BookIcon, BriefcaseIcon, GitPullRequest, LayoutDashboardIcon, LucideLogOut, MenuIcon, Rss, Users2, WebhookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";



import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
const DashboardNav = [
    { name: "Dashboard", icon: <LayoutDashboardIcon className="w-5 h-5" />, Link: "/dashboard" },
    { name: "My Projects", icon: <WebhookIcon className="w-5 h-5" />, Link: "/dashboard/project" },
    { name: "My Forums", icon: <GitPullRequest className="w-5 h-5" />, Link: "/dashboard/forum" },
    { name: "My Blogs", icon: <BookIcon className="w-5 h-5" />, Link: "/dashboard/blog" }
]

const DashboardSecondaryNav = [
    { name: "Community Forums", icon: <Users2 className="w-5 h-5" />, link: "/forum" },
    { name: "Projects", icon: <BriefcaseIcon className="w-5 h-5" />, link: "/project" },
    { name: "Leaderboard", icon: <BarChart2 className="w-5 h-5" />, link: "/leaderboard" },
    { name: "Give Feebback", icon: <Rss className="w-5 h-5" />, link: "/feedback" },
]



function SideNavBar() {

    const [active, setActive] = useState("Dashboard");

    return (
        <>
            <div className="flex-col hidden h-screen gap-5 mb-10 lg:flex basis-1/5">
                <div className="flex flex-col items-start justify-center gap-5">
                    {
                        DashboardNav.map((nav, index) => (
                            <Link key={index} href={nav.Link} className="w-full">
                                <Button key={index}
                                    onClick={() => setActive(nav.name)}
                                    variant={active === nav.name ? "default" : "outline"}
                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                    {nav.icon}
                                    <span>{nav.name}</span>
                                </Button>
                            </Link>
                        ))
                    }
                </div>
                <Separator />
                <div className="flex flex-col items-start justify-end gap-5">
                    {
                        DashboardSecondaryNav.map((nav, index) => (
                            <Link key={index} href={nav.link} className="w-full">
                                <Button
                                    variant="outline"
                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                    {nav.icon}
                                    <span>{nav.name}</span>
                                </Button>
                            </Link>
                        ))
                    }
                    <Separator />
                    <Button
                        variant="destructive"
                        className="flex items-center justify-start w-full gap-2"
                    >
                        <LucideLogOut className="w-5 h-5" /> Logout
                    </Button>
                </div>
            </div>
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <MenuIcon className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent position="left" size="xl">
                        <SheetHeader>
                            <SheetTitle>
                                <Image
                                    src="/ccm.svg"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                />
                            </SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-full px-1">
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start justify-center gap-5">
                                    {
                                        DashboardNav.map((nav, index) => (
                                            <Link key={index} href={nav.Link} className="w-full">
                                                <Button key={index}
                                                    onClick={() => setActive(nav.name)}
                                                    variant={active === nav.name ? "default" : "outline"}
                                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                                    {nav.icon}
                                                    <span>{nav.name}</span>
                                                </Button>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <Separator />
                                <div className="flex flex-col items-start justify-end gap-5">
                                    {
                                        DashboardSecondaryNav.map((nav, index) => (
                                            <Link key={index} href={nav.link} className="w-full">
                                                <Button
                                                    variant="outline"
                                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                                    {nav.icon}
                                                    <span>{nav.name}</span>
                                                </Button>
                                            </Link>
                                        ))
                                    }
                                    <Separator />
                                    <Button
                                        variant="destructive"
                                        className="flex items-center justify-start w-full gap-2"
                                    >
                                        <LucideLogOut className="w-5 h-5" /> Logout
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default SideNavBar