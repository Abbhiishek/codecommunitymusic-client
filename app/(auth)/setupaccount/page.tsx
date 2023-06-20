"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Interests } from "@/config/interest"
import { Skills } from "@/config/skills"
import { useGetSessionUser } from "@/hooks/user/get-current-user"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be atleast 2 characters long"
    }).max(50),
    first_name: z.string().min(2, {
        message: "First name must be atleast 2 characters long"
    }).max(50),
    last_name: z.string().min(2, {
        message: "Last name must be atleast 2 characters long"
    }).max(50),
    bio: z.string().max(1500),
    github_username: z.string().max(50),
    twitter_username: z.string().max(50),
    linkedin_username: z.string().max(50),
    website: z.string().max(50),
    gender: z.string().max(50),
    Interest: z.array(z.string().max(50)).max(5),
    skills: z.array(z.string().max(50)).max(5, {
        message: "You can only select 5 skills"
    }),
    age: z.number().min(13).max(100),
    phone_number: z.number().min(10).max(10),
    email: z.string().email({
        message: "Email should be Valid"
    })
})



function AccountSetupPage() {
    const { data: user } = useGetSessionUser()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: user?.data.first_name,
            last_name: user?.data.last_name,
            username: user?.data.username,
            email: user?.data.email,
            bio: user?.data.bio,
            skills: user?.data.skills,
            Interest: user?.data.interests,
            github_username: user?.data.github,
            twitter_username: user?.data.twitter,
            linkedin_username: user?.data.linkedin,
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        alert(JSON.stringify(values, null, 2))
        console.log(values.Interest)
    }
    return (
        <div className="flex items-center justify-center mt-10">
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>Account Setup</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="rounded-md h-[500px] px-3">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="flex flex-row items-center justify-between gap-5">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /><FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>About me</FormLabel>
                                            <FormControl>
                                                <Textarea {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This will not be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Skills</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl className="flex flex-row justify-between h-fit">
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between w-full",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ?
                                                                <div className="flex flex-wrap gap-1">
                                                                    {field.value.map((skill) => (
                                                                        <Badge key={skill}>{skill}</Badge>
                                                                    ))
                                                                    }
                                                                </div>

                                                                : "Select Skills"}
                                                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 ">
                                                    <Command>
                                                        <CommandInput placeholder="Search framework..." />
                                                        <CommandEmpty>No skills found.</CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea className="h-64">
                                                                {Skills.map((skill: string) => (
                                                                    <CommandItem
                                                                        value={skill}
                                                                        key={skill}
                                                                        onSelect={() => {
                                                                            if (field.value?.includes(skill)) {
                                                                                form.setValue("skills", field.value.filter((s) => s !== skill))
                                                                                return
                                                                            }
                                                                            form.setValue("skills", [...field.value || [], skill])
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                field.value?.includes(skill)
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {skill}
                                                                    </CommandItem>
                                                                ))}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                This will be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="Interest"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Interest</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl className="flex flex-row justify-between h-fit">
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between w-full",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ?
                                                                <div className="flex flex-wrap gap-1">
                                                                    {field.value.map((interest) => (
                                                                        <Badge key={interest}>{interest}</Badge>
                                                                    ))
                                                                    }
                                                                </div>

                                                                : "Select Interest"}
                                                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 ">
                                                    <Command>
                                                        <CommandInput placeholder="Search ..." />
                                                        <CommandEmpty>No Intersts found.</CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea className="h-64">
                                                                {Interests.map((interest: string) => (
                                                                    <CommandItem
                                                                        value={interest}
                                                                        key={interest}
                                                                        onSelect={() => {
                                                                            if (field.value?.includes(interest)) {
                                                                                form.setValue("Interest", field.value.filter((s) => s !== interest))
                                                                                return
                                                                            }
                                                                            form.setValue("Interest", [...field.value || [], interest])

                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                field.value?.includes(interest)
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
                                            <FormDescription>
                                                This will be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="github_username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Github Username</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This will not be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="twitter_username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twitter Username</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This will not be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedin_username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Linkedin Username</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This will not be visible on your Profile.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </ScrollArea>
                </CardContent>
            </Card>

        </div >
    )
}

export default AccountSetupPage