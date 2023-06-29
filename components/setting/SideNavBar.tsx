
"use client"

import { Button } from "@/components/ui/button";
import { Edit3Icon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const settingNav = [
    { name: "Account", icon: <User className="w-5 h-5" />, Link: "/setting", path: "setting" },
    { name: "Edit Profile", icon: <Edit3Icon className="w-5 h-5" />, Link: "/setting/edit-profile", path: "edit-profile" }
]


function SettingSideNavBar() {
    const pathname = usePathname();
    const [active, setActive] = useState("/setting");

    useEffect(() => {
        setActive(pathname.split('/').pop()!);
    }, [pathname])



    return (
        <div className="col-span-12 p-2 lg:col-span-3 ">
            <div className="flex flex-col items-start justify-center gap-5">
                {
                    settingNav.map((nav, index) => (
                        <Link key={index} href={nav.Link} className="w-full">
                            <Button key={index}
                                onClick={() => setActive(nav.path)}
                                variant={active === nav.path ? "default" : "outline"}
                                className={`flex items-center justify-start w-full gap-2 
                            `}>
                                {nav.icon}
                                <span>{nav.name}</span>
                            </Button>
                        </Link>
                    ))
                }
            </div>
        </div>

    )
}

export default SettingSideNavBar