



import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTube from "@/components/youtubecard/YoutubeCard";
import { Course } from "@/types/Course";
import InteractiveView from "./InteractiveView";
import SimplifiedView from "./SimplifiedView";

function ExplorePath({ courses, externalVideos }: { courses: Course[], externalVideos: string[] }) {
    return (
        <div>
            <Tabs defaultValue="interactive" className="flex flex-col items-center justify-normal">
                <TabsList className="w-full">
                    <TabsTrigger value="interactive" className="w-full">Interactive View</TabsTrigger>
                    <TabsTrigger value="simplified" className="w-full">Simplified View</TabsTrigger>
                </TabsList>
                <TabsContent value="interactive">
                    <InteractiveView courses={courses} />
                </TabsContent>
                <TabsContent value="simplified" className="w-full">
                    <SimplifiedView courses={courses} />
                </TabsContent>
            </Tabs>
            <div className="mt-10">
                <h2 className="font-extrabold capitalize lg:text-3xl">Video Resources</h2>
                <span className="font-light text-slate-500">
                    Explore our Recommended Video Resources.
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {externalVideos.map((video, index) => (
                        <div key={index} className="p-2">
                            <YouTube id={video} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ExplorePath