'use client'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Github,
    LayoutDashboardIcon,
    LifeBuoy,
    LogOut,
    Settings,
    TrendingUp,
    User
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/User";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { toast } from "../ui/use-toast";


const navigation = [
    { name: 'Profile', href: '/profile', logo: <User className="w-4 h-4 mr-2" /> },
    { name: 'Leaderboard', href: '/leaderboard', logo: <TrendingUp className="w-4 h-4 mr-2" /> },
    { name: 'Dashboard', href: '/dashboard', logo: <LayoutDashboardIcon className="w-4 h-4 mr-2" /> },
    { name: 'Settings', href: '/setting', logo: <Settings className="w-4 h-4 mr-2" /> },
]

const NavUserProfile = ({ session }: { session: UserData }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer">
                    <AvatarImage src={session?.data?.profile_pic! || ""} alt={session?.data?.first_name!} />
                    <AvatarFallback >
                        <User className="w-8 h-8 " />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-10">
                <DropdownMenuLabel>Hii {session?.data.first_name || session?.data.username} 👋</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        navigation.map((item, index) => (
                            <Link href={item.href} key={index}>
                                <DropdownMenuItem>
                                    {item.logo}
                                    <span>{item.name}</span>
                                </DropdownMenuItem>
                            </Link>
                        ))
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github className="w-4 h-4 mr-2" />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="w-4 h-4 mr-2" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={async () => {
                        toast({
                            title: "Logging out out ❕",
                            description: "You are being logged out",
                        })
                        localStorage.removeItem("session_token");
                        await signOut();
                        window.location.href = "/";
                    }}
                >
                    <LogOut className="w-4 h-4 mr-2 text-red-600" />
                    <span className="text-red-600">Log out</span>
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export default NavUserProfile