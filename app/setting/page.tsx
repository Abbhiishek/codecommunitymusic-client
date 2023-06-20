"use client"

import Account from "@/components/setting/Account";
import Profile from "@/components/setting/Profile";
import { Button } from "@/components/ui/button";
import { useGetSessionUser } from "@/hooks/user/get-current-user";
import { Edit3Icon, User } from "lucide-react";
import { useState } from "react";



const settingNav = [
    { name: "Account", icon: <User className="w-5 h-5" /> },
    { name: "Edit Profile", icon: <Edit3Icon className="w-5 h-5" /> }
]


function Setting() {
    const { data, isLoading } = useGetSessionUser();
    const [active, setActive] = useState("Account");
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="px-4 my-10 lg:container">
            <h1 className="text-xl">Account Settings</h1>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-12 p-2 lg:col-span-3 ">
                    <div className="flex flex-col items-start justify-center gap-5">
                        {
                            settingNav.map((nav, index) => (
                                <Button key={index}
                                    onClick={() => setActive(nav.name)}
                                    variant={active === nav.name ? "default" : "outline"}
                                    className={`flex items-center justify-start w-full gap-2 
                                    `}>
                                    {nav.icon}
                                    <span>{nav.name}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className="lg:col-span-9 col-span-12 h-[900px] ">
                    {
                        active === "Account" && <Account user={data!} />
                    }
                    {
                        active === "Edit Profile" && <Profile user={data!} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Setting