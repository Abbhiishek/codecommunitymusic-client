import { Loader2 } from "lucide-react"

function loading() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-40 h-4" />
        </div>
    )
}

export default loading