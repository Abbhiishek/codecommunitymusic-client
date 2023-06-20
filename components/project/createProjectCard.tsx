'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader2, PlusCircleIcon } from "lucide-react"
import { nanoid } from 'nanoid'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import { toast } from "../ui/use-toast"


const projectSchema = z.object({
    title: z.string({
        description: "Title is required",
        required_error: "Title is required",
        invalid_type_error: "Title is must be string",
    }).min(5, {
        message: "Title must be at least 5 characters long"
    }),
    subtitle: z.string({
        description: "Subtitle is required",
        required_error: "Subtitle is required",
        invalid_type_error: "Subtitle is must be string",
    }).min(10, {
        message: "Subtitle must be at least 10 characters long"
    }).max(225, {
        message: "Subtitle must be at most 225 characters long"
    }),
    description: z.string({
        description: "Description is required",
        required_error: "Description is required",
        invalid_type_error: "Description is must be string",
    }).min(10, {
        message: "Description must be at least 10 characters long"
    }),
    TechStack: z.array(z.string({
        description: "TechStack is required",
        required_error: "TechStack is required",
        invalid_type_error: "TechStack is must be string",
    })).min(1, {
        message: "You must select at least one tech stack"
    }),
    Typeofproject: z.array(z.string({
        description: "Typeofproject is required",
        required_error: "Typeofproject is required",
        invalid_type_error: "Typeofproject is must be string",
    })).min(1, {
        message: "You must select at least one type of project"
    }),
    hostedlink: z.string({
        description: "Hostedlink is required",
        required_error: "Hostedlink is required",
        invalid_type_error: "Hostedlink is must be string",
    }).url({
        message: "Hostedlink must be a valid URL"
    }),
    githublink: z.string({
        description: "Githublink is required",
        required_error: "Githublink is required",
        invalid_type_error: "Githublink is must be string",
    }).url({
        message: "Githublink must be a valid URL"
    }),
    bannerimage: z.string({
        description: "Bannerimage is required",
        required_error: "Bannerimage is required",
        invalid_type_error: "Bannerimage is must be string",
    }).url({
        message: "Bannerimage must be a valid URL"
    }),
    projectimage: z.string({
        description: "Projectimage is required",
        required_error: "Projectimage is required",
        invalid_type_error: "Projectimage is must be string",
    }).url({
        message: "Projectimage must be a valid URL"
    }),

});


const techStack = [
    'React',
    'Next.js',
    'TailwindCSS',
    'TypeScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Redis',
    'Prisma',
    'GraphQL'
]

const typeofProject = [
    'Open Source',
    'Personal',
    'Commercial',
    'Non-Profit',
    'Educational',
    'Frontend',
    'Backend',
    'Fullstack',
    'Mobile',
    'Desktop',
    'Web',
    'API',
    'CLI',
    'Other'
]


function CreateProject() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [TechStack, setTechStack] = useState<string[]>([])
    const [Typeofproject, setTypeofproject] = useState<string[]>([])
    const [hostedlink, setHostedlink] = useState("")
    const [githublink, setGithublink] = useState("")
    const [bannerimage, setBannerimage] = useState("")
    const [projectimage, setProjectimage] = useState("")
    const [formerror, setFormerror] = useState("")
    const [loading, setLoading] = useState(false)

    const createproejectmutation = useMutation({
        retry: false,
        cacheTime: 0,
        mutationFn: createproject,
    })


    async function createproject() {

        try {
            const uniquestring = nanoid(4);
            const slug = `${title.toLowerCase().replace(/ /g, "-")}-${uniquestring}`
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`,
                {
                    title,
                    description,
                    subtitle,
                    tech_stack: TechStack,
                    tags: Typeofproject,
                    slug,
                    demoLink: hostedlink,
                    githubLink: githublink,
                    bannerImage: bannerimage,
                    mainImage: projectimage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("session_token")}`,
                    },
                });
            console.log("The login mutation ", data);
            if (data.status === "success") {
                toast({
                    title: `Project Created ✨`,
                    description: `Project Created Successfully hurry up and share it with the world`,
                })
                setLoading(false)
                toast({
                    title: "Redirecting",
                    description: "Redirecting to your project",
                })
                router.push(`/project/${slug}`);
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                console.log(error);
                setFormerror(error.response.data.slug);
                toast({
                    title: "Error",
                    description: error.response.data.slug,
                })
                setLoading(false)
            }
        }
    }

    // create project
    const handlesubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const result = projectSchema.safeParse({
            title,
            description,
            subtitle,
            TechStack,
            Typeofproject,
            hostedlink,
            githublink,
            bannerimage,
            projectimage,
        })

        if (!result.success) {
            setFormerror(result.error.errors[0].message)
            toast({
                title: "Error",
                description: result.error.errors[0].message,
            })
            setLoading(false)
        } else {
            setFormerror("")
            await createproejectmutation.mutate()
        }
    }

    return (
        <>
            <Dialog >
                <DialogTrigger>
                    <Button
                        className="text-xs ">
                        <PlusCircleIcon className="w-6 h-6 " />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <span className="">
                                Create Project
                            </span>
                        </DialogTitle>
                        <DialogDescription>
                            <p className="text-sm text-gray-500">Create a project to share with the world</p>
                            <Separator className="my-4" />
                            <p className="inline text-red-500">{formerror}</p>
                            <ScrollArea
                                className="px-3 py-2 h-96"
                            >
                                <div>
                                    <form onSubmit={handlesubmit}>
                                        <div className="mb-4">
                                            <Label htmlFor="title">Title of Project</Label>
                                            <Input
                                                type="text"
                                                placeholder="Title"
                                                value={title}
                                                id="title"
                                                required={true}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="subtitle">Subtitle of Project</Label>
                                            <Input
                                                type="text"
                                                placeholder="Subtitle"
                                                value={subtitle}
                                                id="subtitle"
                                                onChange={(e) => setSubtitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="description">Description of Project</Label>
                                            <Textarea

                                                placeholder="description..."
                                                value={description}
                                                id="description"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="description">Tech Stack</Label>
                                            <div className="grid grid-cols-3 gap-5 mt-3">
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
                                                            id={`createproject` + tech} />
                                                        <label
                                                            htmlFor={`createproject` + tech}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {tech}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="mb-4">
                                            <Label htmlFor="description">Type of Project</Label>
                                            <div className="grid grid-cols-3 gap-5 mt-3">
                                                {typeofProject.map((type, index) => (
                                                    <div className="flex items-center space-x-2" key={index}>
                                                        <Checkbox
                                                            checked={Typeofproject.includes(type)}
                                                            onClick={() => {
                                                                if (Typeofproject.includes(type)) {
                                                                    setTypeofproject(Typeofproject.filter((t) => t !== type))
                                                                } else {
                                                                    setTypeofproject([...Typeofproject, type])
                                                                }
                                                            }}
                                                            id={`typeof` + type} />
                                                        <label
                                                            htmlFor={`typeof` + type}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {type}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="mb-4">
                                            <Label htmlFor="githublink">Github Link</Label>
                                            <Input
                                                type="url"
                                                placeholder="paste github link here..."
                                                value={githublink}
                                                id="githublink"
                                                onChange={(e) => setGithublink(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="hostedlink">Hosted Link</Label>
                                            <Input
                                                type="url"
                                                placeholder="paste live link here"
                                                value={hostedlink}
                                                id="hostedlink"
                                                onChange={(e) => setHostedlink(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="projectimage">Project Main Image</Label>
                                            <Input
                                                type="url"
                                                placeholder="paste your project image link here"
                                                value={projectimage}
                                                id="projectimage"
                                                onChange={(e) => setProjectimage(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="projectbannerimage">Project Banner Image</Label>
                                            <Input
                                                type="url"
                                                placeholder="paste your project image link here"
                                                value={bannerimage}
                                                id="projectbannerimage"
                                                onChange={(e) => setBannerimage(e.target.value)}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </ScrollArea>
                            <Separator className="my-4" />
                            <div className="flex flex-row items-center justify-center gap-5">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    onClick={handlesubmit}
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Create Project"}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}



export default CreateProject