"use client"

import { Button } from "@/components/ui/button"
import { IForumData } from "@/types/Forum"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle2, Edit3Icon, XSquare } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<IForumData>[] = [
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
        header: "Votes",
        cell: ({ row }) => {
            const forum = row.original
            return <span>{forum.upvotes.length}</span>
        }
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "is_closed",
        header: "Closed",
        cell: ({ row }) => {
            const forum = row.original
            return <span>{forum.is_closed ? <CheckCircle2 className="text-green-600" /> : <XSquare className="text-red-600" />}</span>
        }
    },
    {
        accessorKey: "is_solved",
        header: "Solved",
        cell: ({ row }) => {
            const forum = row.original
            return <span>{forum.is_solved ? <CheckCircle2 className="text-green-600" /> : <XSquare className="text-red-600" />}</span>
        }
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",

        cell: ({ row }) => {
            const forum = row.original
            return (
                <Button variant="default">
                    <Link href={`/dashboard/project/${forum.slug}/edit`}>
                        <Edit3Icon className="w-4 h-4" />
                    </Link>
                </Button>
            )
        },
    },

]
