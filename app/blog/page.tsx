import { Book } from "lucide-react"

function BlogPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <Book className="w-32 h-32 text-white" />
            <span>
                <h1 className="font-mono text-4xl font-bold">Coming Soon</h1>
            </span>
        </div>
    )
}

export default BlogPage