'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


// const techStack = [
//     'React',
//     'Next.js',
//     'TailwindCSS',
//     'TypeScript',
//     'Node.js',
//     'Express',
//     'PostgreSQL',
//     'Redis',
//     'Prisma',
//     'GraphQL'
// ]

// const typeofProject = [
//     'Open Source',
//     'Personal',
//     'Commercial',
//     'Non-Profit',
//     'Educational',
//     'Frontend',
//     'Backend',
//     'Fullstack',
//     'Mobile',
//     'Desktop',
//     'Web',
//     'API',
//     'CLI',
//     'Other'
// ]

const ProjectFilterOptions = ({
    search,
    setSearch,
}: {
    search: string,
    setSearch: (search: string) => void
}) => {

    return (
        <>
            <Card className="sticky top-4">
                <CardHeader>
                    <CardTitle>Search Projects</CardTitle>
                    <CardDescription>
                        Search for projects by name, description, or tags.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label
                        className="flex items-center justify-between mb-2"
                        htmlFor="Search"
                    >
                        <span>Search</span>
                    </Label>
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-2 shadow shadow-slate-100"
                        placeholder="Search here ...." />

                    {/* <hr className="mt-5" />
                    <Label
                        className="flex items-center justify-between my-2"
                    >
                        <span>Tags</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        {techStack.map((tech, index) => (
                            <div className="flex items-center space-x-2" key={index}>
                                <Checkbox
                                    checked={TechStack.includes(tech)}
                                    onClick={() => {
                                        if (TechStack.includes(tech)) {
                                            setTechStack(TechStack.filter((t) => t !== tech))
                                        } else {
                                            setTechStack([...TechStack, tech])
                                        }
                                    }}
                                    id={tech} />
                                <label
                                    htmlFor={tech}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {tech}
                                </label>
                            </div>
                        ))
                        }
                    </div>
                    <hr className="mt-5" />
                    <Label
                        className="flex items-center justify-between my-5"
                    >
                        Type
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        {typeofProject.map((type, index) => (
                            <div className="flex items-center space-x-2" key={index}>
                                <Checkbox
                                    checked={Type.includes(type)}
                                    onClick={() => {
                                        if (Type.includes(type)) {
                                            setTypeofProject(Type.filter((t) => t !== type))
                                        } else {
                                            setTypeofProject([...Type, type])
                                        }
                                    }}
                                    id={type} />
                                <label
                                    htmlFor={type}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {type}
                                </label>
                            </div>
                        ))
                        }
                    </div> */}
                </CardContent>
                {/* <CardFooter>
                    <Button
                        variant="secondary"
                        className="w-full"
                        disabled={searching}
                    >
                        {
                            searching && <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        }
                        Apply Filters
                    </Button>
                </CardFooter> */}
            </Card>
        </>
    )
}

export default ProjectFilterOptions