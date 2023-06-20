import { TowerControl } from "lucide-react"

function MarketPlace() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <TowerControl className="w-32 h-32 text-white" />
            <span>
                <h1 className="font-mono text-4xl font-bold">Coming Soon</h1>
            </span>
        </div>
    )
}

export default MarketPlace