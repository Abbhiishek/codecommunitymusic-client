"use client"

import Account from "@/components/setting/Account";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSessionUser } from "@/hooks/user/get-current-user";


function Setting() {
    const { data, isLoading } = useGetSessionUser();
    if (isLoading) return (
        <div className="flex justify-center w-full">
            <Skeleton className="w-full h-[900px]" />
        </div>
    )

    return (
        <Account user={data!} />
    )
}

export default Setting