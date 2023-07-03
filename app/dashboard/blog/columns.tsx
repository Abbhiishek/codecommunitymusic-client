"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit3Icon } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IBlogData } from "@/types/Blog"
import Link from "next/link"

export const columns: ColumnDef<IBlogData>[] = [
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
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const blog = row.original
            return (
                <div className="flex flex-wrap gap-2">
                    {
                        blog.tags?.map((tag, index) => {
                            return <Badge key={index} variant={'secondary'} className="truncate" >{tag}</Badge>
                        })
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "appreciators",
        header: "Likes",
        cell: ({ row }) => {
            const blog = row.original
            return <code>{blog.appreciators?.length}</code>
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
        id: "Edit",
        accessorKey: "actions",
        header: "Edit",
        meta: {
            width: 100,
        },
        cell: ({ row }) => {
            const project = row.original
            return (
                <Link href={`/dashboard/blog/${project.slug}/edit`}>
                    <Button variant="default">
                        <Edit3Icon className="w-4 h-4" />
                    </Button>
                </Link>
            )
        },
    },

]
