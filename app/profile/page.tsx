'use client'

import ProfileHeader from "@/components/profile/profileHeader";
import ProfileSectionToggle from "@/components/profile/profilesectionToggle";
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
        <div className="my-10">
            <ProfileHeader data={user?.data} />
            <ProfileSectionToggle username={user?.data?.username} />
        </div>
    );
}


export default ProfilePage;