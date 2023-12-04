import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

function ChatFeatureAnnouchment() {

    return (
        <Link
            href={"/dashboard/chat"}
            className='w-full relative'
        >
            <div className='absolute -inset-0 mt-4 -z-10 blur-sm animate-text-hero bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500' />
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Introducing Ai Powered Linus , who is 24/7 available to answer your questions.
                </AlertDescription>
            </Alert>
        </Link>
    )
}

export default ChatFeatureAnnouchment