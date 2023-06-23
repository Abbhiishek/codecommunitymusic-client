export interface TodoData {
    data: Todo[];
    message: string;
}

export interface Todo {
    id: number;
    todo: string;
    author: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}