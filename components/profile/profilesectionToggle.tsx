import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileProject from "./profileProject"

export default function ProfileSectionToggle({ username }: { username: string }) {


    return (
        <Tabs defaultValue="projects" className="flex flex-col items-center justify-center w-full gap-10">
            <TabsList className="grid content-center w-3/4 h-[110px] lg:h-full grid-cols-1 gap-1 lg:w-1/2 lg:grid-cols-3">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="discussion">Discussions</TabsTrigger>
                <TabsTrigger value="resource">Resources</TabsTrigger>
                {/* <TabsTrigger value="resume">Resume</TabsTrigger> */}
            </TabsList>
            <TabsContent value="projects">
                <ProfileProject username={username} />
            </TabsContent>
            <TabsContent value="discussion">
                <div className="flex flex-col items-center justify-center py-48 min-h-fit">
                    <span>Discussion</span>
                    <span>Comming soon.....</span>

                </div>

            </TabsContent>
            <TabsContent value="resource">
                <div className="flex flex-col items-center justify-center py-48 min-h-fit">
                    <span>resource</span>
                    <span>Comming soon.....</span>

                </div>

            </TabsContent>
        </Tabs>

    )

}