"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit3Icon, GithubIcon, Globe } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Button } from "@/components/ui/button"
import { IProjectData } from "@/types/Project"
import Link from "next/link"

export const columns: ColumnDef<IProjectData>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
    },
    {
        accessorKey: "upvotes",
        header: "Likes",
        cell: ({ row }) => {
            const project = row.original
            return <code>{project.upvotes.length}</code>
        }
    },
    {
        accessorKey: "is_published",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <>
                    {
                        row.original.is_published ? <Button variant="success">Published</Button> : <Button variant="ghost" className="bg-yellow-600 hover:bg-yellow-700">Draft</Button>
                    }
                </>
            )
        }
    },
    {
        accessorKey: "demoLink",
        header: "Demo Link",
        cell: ({ row }) => {
            return (
                <Button variant="ghost">
                    <Link href={row.original.demoLink} target="_blank">
                        <Globe className="w-4 h-4" />
                    </Link>
                </Button>
            )
        },
    },
    {
        accessorKey: "githubLink",
        header: "Github Repo",
        cell: ({ row }) => {
            return (

                <Link href={row.original.githubLink} target="_blank" passHref legacyBehavior>
                    <Button variant="ghost">
                        <GithubIcon className="w-4 h-4" />
                    </Button>
                </Link>

            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return new Date(row.original.created_at).toDateString()
        },
    },
    {
        id: "Edit",
        accessorKey: "actions",
        header: "Edit",
        cell: ({ row }) => {
            const project = row.original
            return (
                <Button variant="default">
                    <Link href={`/dashboard/project/${project.slug}/edit`}>
                        <Edit3Icon className="w-4 h-4" />
                    </Link>
                </Button>
            )
        },
    },

]
