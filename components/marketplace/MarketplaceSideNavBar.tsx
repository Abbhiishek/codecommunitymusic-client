"use client"


import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { GraduationCapIcon, MenuIcon, PaperclipIcon, Presentation, WebhookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const DashboardNav = [
    { name: "Learning Paths", icon: <GraduationCapIcon className="w-5 h-5" />, Link: "/marketplace/learning-path", urlname: "learning-path" },
    { name: "All courses", icon: <Presentation className="w-5 h-5" />, Link: "/marketplace/course", urlname: "course" },
    { name: "Projects", icon: <WebhookIcon className="w-5 h-5" />, Link: "/marketplace/project", urlname: "project" },
    { name: "Cheatsheet", icon: <PaperclipIcon className="w-5 h-5" />, Link: "/marketplace/cheatsheet", urlname: "cheatsheet" },
    // { name: "Videos", icon: <Video className="w-5 h-5" />, Link: "/marketplace/video", urlname: "videos" }
]

function MarketplaceSideNavBar() {
    const pathname = usePathname();
    const [active, setActive] = useState(usePathname().split('/').pop());

    useEffect(() => {
        setActive(pathname.split('/').pop());
    }, [pathname])


    return (
        <>
            <div className="flex-col hidden h-screen gap-5 mb-10 lg:flex basis-1/5">
                <div className="flex flex-col items-start justify-center gap-5">
                    {
                        DashboardNav.map((nav, index) => (
                            <Link key={index} href={nav.Link} className="w-full">
                                <Button key={index}
                                    onClick={() => setActive(nav.urlname)}
                                    variant={active === nav.urlname ? "default" : "outline"}
                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                    {nav.icon}
                                    <span>{nav.name}</span>
                                </Button>
                            </Link>
                        ))
                    }
                    {/* <Separator />
                    <Link href="/marketplace/learning-path/create" className="w-full">
                        <Button variant="default" className="w-full">
                            Request Resource 🚩
                        </Button>
                    </Link> */}
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
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default MarketplaceSideNavBar