'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Interests } from "@/config/interest"
import { Profession } from "@/config/profession"
import { Skills } from "@/config/skills"
import { cn } from "@/lib/utils"
import { UserData } from "@/types/User"
import axios from "axios"
import { useEffect, useState } from "react"
import * as z from "zod"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import { toast } from "../ui/use-toast"

const ProfileSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    display_name: z.string().nullable().optional(),
    bio: z.string().optional(),
    profession: z.string().nullable().optional(),
    gender: z.string().optional(),
    twitter: z.string().url(
        "Please enter a valid twitter url. Example: https://twitter.com/username"
    ).optional().or(z.literal("")),
    linkedin: z.string().url(
        "Please enter a valid linkedin url. Example: https://linkedin.com/in/username"
    ).optional().or(z.literal("")),
    github: z.string().url(
        "Please enter a valid github url. Example: https://github.com/username"
    ).optional().or(z.literal("")),
    website: z.string().url(
        "Please enter a valid website url. Example: https://example.com"
    ).optional().or(z.literal("")),
    skills: z.array(z.string()).max(10, {
        message: "You can only add 10 skills"
    }).optional().or(z.literal("")),
    interests: z.array(z.string()).max(10, {
        message: "You can only add 10 interests"
    }).optional().or(z.literal("")),
})




function Profile({ user }: { user: UserData }) {

    const [skills, setSkills] = useState<string[]>(user?.data.skills || [])
    const [interests, setInterests] = useState<string[]>(user?.data.interests || [])
    const [profession, setProfession] = useState<string>(user?.data.profession || "")
    const [first_name, setFirstName] = useState<string>(user?.data.first_name || "")
    const [last_name, setLastName] = useState<string>(user?.data.last_name || "")
    const [display_name, setDisplayName] = useState<string>(user?.data.display_name || "")
    const [bio, setBio] = useState<string>(user?.data.bio || "")
    const [gender, setGender] = useState<string>(user?.data.gender || "")
    const [twitter, setTwitter] = useState<string>(user?.data.twitter || "")
    const [linkedin, setLinkedin] = useState<string>(user?.data.linkedin || "")
    const [github, setGithub] = useState<string>(user?.data.github || "")
    const [website, setWebsite] = useState<string>(user?.data.website || "")
    const [saving, setSaving] = useState<boolean>(false)
    const [madeChanges, setMadeChanges] = useState<boolean>(false)

    useEffect(() => {
        if (
            skills !== user?.data.skills ||
            interests !== user?.data.interests ||
            profession !== user?.data.profession ||
            first_name !== user?.data.first_name ||
            last_name !== user?.data.last_name ||
            display_name !== user?.data.display_name ||
            bio !== user?.data.bio ||
            gender !== user?.data.gender ||
            twitter !== user?.data.twitter ||
            linkedin !== user?.data.linkedin ||
            github !== user?.data.github ||
            website !== user?.data.website
        ) {
            setMadeChanges(true);
        }
    }, [skills,
        interests,
        gender, twitter, linkedin, github, website,
        profession,
        first_name,
        last_name,
        display_name,
        bio,
        user
    ])



    const saveUserDetails = async () => {
        const result = ProfileSchema.safeParse({
            first_name,
            last_name,
            display_name,
            bio,
            profession,
            skills,
            interests,
            gender,
            twitter,
            linkedin,
            github,
            website,
        })
        if (!result.success) {
            console.log(result.error)
            toast({
                title: "Error",
                description: result.error.issues[0].message,
            })
            return
        }

        setSaving(true)

        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateuser`, {
            ...user?.data,
            first_name,
            last_name,
            display_name,
            bio,
            profession,
            skills,
            interests,
            gender,
            twitter,
            linkedin,
            github,
            website,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("session_token")}`,
            },
        })

        if (res.status === 200) {
            toast({
                title: "Success",
                description: "Your profile has been updated",
            })
            setMadeChanges(false)
            setSaving(false)
        }


    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Change your profile information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="w-full">
                            <Label htmlFor="firstname">First Name</Label>
                            <Input type="text" id="firstname" className="input"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input type="text" id="lastname" className="input"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 md:flex-row" >
                        <div className="w-full">
                            <Label htmlFor="disname">Display Name</Label>
                            <Input type="text" id="disname" className="input"
                                placeholder="Display Name"
                                value={display_name}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="lastname">Profession</Label>
                            <Select
                                defaultValue={profession}
                                onValueChange={
                                    (value) => setProfession(value)
                                }>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Profession" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[200px]">
                                        {
                                            Profession.map((item, index) => (
                                                <SelectItem key={index} value={item}>{item}</SelectItem>
                                            ))
                                        }
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="w-full">
                            <Label htmlFor="gender">Gender</Label>
                            <RadioGroup defaultValue={gender}
                                onValueChange={
                                    (value) => setGender(value)
                                }
                                className="flex gap-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Male" id="r1" />
                                    <Label htmlFor="r1">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Female" id="r2" />
                                    <Label htmlFor="r2">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Other" id="r3" />
                                    <Label htmlFor="r3">Other</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Write something about yourself"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg">Social Media Links</h1>
                        <span className="text-sm">Links added here will be reflected on your profile page.</span>
                        <div className="grid grid-cols-2 gap-3 pt-3">
                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="twitter">Twitter</Label>
                                <Input type="url" id="twitter"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="Linkedin">Linkedin</Label>
                                <Input type="url" id="Linkedin"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="Github">Github</Label>
                                <Input type="url" id="Github"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="personal-website">Portfolio</Label>
                                <Input type="url" id="personal-website"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="my-4">
                        <Label htmlFor="bio" className="text-xl">Skills</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "justify-between w-full h-full text-left font-normal p-2",
                                        !skills && "text-muted-foreground"
                                    )}
                                >
                                    {skills
                                        ?
                                        <div className="flex flex-wrap gap-1">
                                            {skills.map((interest) => (
                                                <Badge key={interest}>{interest}</Badge>
                                            ))
                                            }
                                        </div>

                                        : "Select Interest"}
                                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 ">
                                <Command>
                                    <CommandInput placeholder="Search ..." />
                                    <CommandEmpty>No Skills found.</CommandEmpty>
                                    <CommandGroup>
                                        <ScrollArea className="h-64">
                                            {Skills.map((interest: string) => (
                                                <CommandItem
                                                    value={interest}
                                                    key={interest}
                                                    onSelect={() => {
                                                        setSkills((prev) =>
                                                            prev.includes(interest)
                                                                ? prev.filter((i) => i !== interest)
                                                                : [...prev, interest]
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            skills?.includes(interest)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {interest}
                                                </CommandItem>
                                            ))}
                                        </ScrollArea>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="my-4">
                        <Label htmlFor="interests" className="text-xl">Interests</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "justify-between w-full h-full text-left font-normal p-2",
                                        !interests && "text-muted-foreground"
                                    )}
                                >
                                    {interests
                                        ?
                                        <div className="flex flex-wrap gap-1">
                                            {interests.map((interest) => (
                                                <Badge key={interest}>{interest}</Badge>
                                            ))
                                            }
                                        </div>

                                        : "Select Interest"}
                                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 ">
                                <Command>
                                    <CommandInput placeholder="Search ..." />
                                    <CommandEmpty>No interests found.</CommandEmpty>
                                    <CommandGroup>
                                        <ScrollArea className="h-64">
                                            {Interests.map((interest: string) => (
                                                <CommandItem
                                                    value={interest}
                                                    key={interest}
                                                    onSelect={() => {
                                                        setInterests((prev) =>
                                                            prev.includes(interest)
                                                                ? prev.filter((i) => i !== interest)
                                                                : [...prev, interest]
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            interests?.includes(interest)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {interest}
                                                </CommandItem>
                                            ))}
                                        </ScrollArea>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>


                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-6">

                <Button
                    variant={"default"}
                    onClick={saveUserDetails}
                    disabled={!madeChanges || saving}
                >
                    Save Changes
                    {
                        saving && <Loader2 className="ml-2 animate-spin" />
                    }
                </Button>
            </CardFooter>
        </Card >

    )
}

export default Profile