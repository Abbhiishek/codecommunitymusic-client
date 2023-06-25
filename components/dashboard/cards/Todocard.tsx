'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useGetUserTodos } from "@/hooks/todos/get-todos";
import axios from "axios";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

const TodoSchema = z.object({
    todo: z.string().nonempty().max(50, {
        message: "Todo must be less than 50 characters"
    }),
})

function Todocard({ username }: { username: string }) {

    const { data: todos, isLoading, refetch } = useGetUserTodos(username);
    const [todo, setTodo] = useState("")
    const [loading, setLoading] = useState(false)


    const handleAddTodo = async () => {
        const result = TodoSchema.safeParse({ todo: todo })
        if (result.success) {
            setLoading(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/todos`, {
                todo: todo
            }, {
                headers: {
                    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
                }
            })
            if (res.status === 201) {
                setTodo("")
                toast({
                    title: "success",
                    description: "Todo added successfully"
                })
                await refetch()
            }
            setLoading(false)
        } else {
            toast({
                title: "error",
                description: result.error.errors[0].message
            })
        }
    }


    const handleDeleteTodo = async (id: number) => {
        setLoading(true)
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/todos/${id}`, {
            headers: {
                Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
            }
        })
        if (res.status === 204) {
            toast({
                title: "success",
                description: "Todo deleted successfully"
            })
            await refetch()
        }
        setLoading(false)
    }

    return (
        <Card className="w-full col-span-12 row-span-2 lg:col-span-5">
            <CardHeader>
                <CardTitle>Todos ⚒️</CardTitle>
                <CardDescription>
                    Add a new todo or view your existing todos.
                </CardDescription>
                <div className="flex items-end justify-end w-full h-full gap-3">
                    <Input placeholder="Add a Todo" value={todo} onChange={(e) => {
                        setTodo(e.target.value)
                    }} />
                    <Button className="" onClick={handleAddTodo}>
                        {loading ? <Loader2 size={24} className="animate-spin" /> : <PlusIcon size={24} />}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>

                <h1>Your Todos</h1>
                <p>click on text to mark the task done ✅</p>
                <ScrollArea className="p-2 ">
                    {todos &&
                        todos?.data?.map((todo) => {
                            return (
                                <TodoComponent key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} refetch={refetch} />
                            )
                        }
                        )
                    }
                    {
                        isLoading && <Skeleton className="w-full h-10" />
                    }
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function TodoComponent({ todo, handleDeleteTodo, refetch }: { todo: any, handleDeleteTodo: any, refetch: Function }) {
    const [todoStatus, setTodoStatus] = useState(todo.status)
    const handletodostatus = async () => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${todo.author}/todos/${todo.id}/update`, {
            status: !todo.status
        }, {
            headers: {
                Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("session_token") : null}`
            }
        })
        if (res.status === 200) {
            await refetch()
            toast({
                title: "success",
                description: "Todo status updated successfully"
            })
        }
    }
    return (
        <div className="flex items-center justify-between w-full gap-3 mt-2 ">
            <div className="flex items-center justify-start gap-2 ">
                <Checkbox id={todo.todo} checked={todoStatus} onCheckedChange={setTodoStatus} onClick={handletodostatus} />
                <label
                    htmlFor={todo.todo}
                    className={
                        todo.status ? "line-through text-gray-400" : ""
                    }
                >
                    {todo.todo}
                </label>
            </div>
            <span className="" >
                <Trash2 size={16}
                    onClick={() => { handleDeleteTodo(todo.id) }}
                    className="text-red-600 cursor-pointer" />
            </span>
        </div>
    )
}




export default Todocard