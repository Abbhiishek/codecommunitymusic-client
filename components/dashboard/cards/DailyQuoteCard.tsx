'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useGetProgrammingQuote } from "@/hooks/randomquote";


function DailyQuoteCard() {
    // randomprogrammingquote
    const { data } = useGetProgrammingQuote()
    return (
        <Card className="w-full col-span-12 row-span-1 lg:col-span-5">
            <CardHeader>
                <CardTitle>Today&apos;s Programming Quote 🧑‍💻</CardTitle>
            </CardHeader>
            <CardContent>
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