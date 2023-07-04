"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
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
                <div className="w-fit">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "tags",
        header: () => <div className="text-center ">Tags</div>,
        cell: ({ row }) => {
            const blog = row.original
            return (
                <div className="flex flex-wrap justify-end gap-2">
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
        header: () => <div className="text-right">Appreciations</div>,
        cell: ({ row }) => {
            const blog = row.original
            return <div className="font-medium text-right">{blog.appreciators?.length}</div>
        }
    },
    {
        accessorKey: "is_published",
        header: ({ column }) => {
            return (
                <div className="font-medium text-right w-fit">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Published
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right w-fit">
                    {
                        row.original.is_published ? <Button variant="success">Published</Button> : <Button variant="ghost" className="bg-yellow-600 hover:bg-yellow-700">Draft</Button>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "slug",
        header: () => <div className="text-right w-fit">View 👀</div>,
        cell: ({ row }) => {
            const project = row.original
            return (
                <div className="font-medium text-right w-fit">
                    <Link href={`/blog/${project.slug}`} >
                        <Button variant="secondary">
                            View
                        </Button>
                    </Link>
                </div>
            )
        },
    },

]
