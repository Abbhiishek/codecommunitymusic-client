'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProgrammingQuote } from "@/hooks/randomquote";


function DailyQuoteCard() {
    // randomprogrammingquote
    const { data, isLoading } = useGetProgrammingQuote()
    return (
        <Card className="w-full col-span-12 row-span-1 lg:col-span-5">
            <CardHeader>
                <CardTitle>Today&apos;s Programming Quote 🧑‍💻</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <code className="text-sm italic">
                        <Skeleton className="w-full h-10" />
                        <br />
                        <Skeleton className="h-4 w-28" />
                    </code>
                )}
                <code className="text-sm italic">
                    &quot; {data?.data.en} &quot;
                    <br />
                    - {data?.data.author}
                </code>
            </CardContent>
        </Card>
    )
}

export default DailyQuoteCard