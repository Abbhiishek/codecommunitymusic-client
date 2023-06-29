"use client"

import Profile from "@/components/setting/Profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSessionUser } from "@/hooks/user/get-current-user";


function EditProfile() {
    const { data, isLoading } = useGetSessionUser();
    if (isLoading) return (
        <div className="flex justify-center w-full">
            <Skeleton className="w-full h-[900px]" />
        </div>
    )

    return (
        <Profile user={data!} />
    )
}

export default EditProfile