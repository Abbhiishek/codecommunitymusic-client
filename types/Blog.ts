import { ShortUser } from "./Author";


export interface IBlogData {
    slug: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    is_published: boolean;
    is_draft: boolean;
    appreciators: ShortUser[];
    author: ShortUser;
}


export interface IBlog {
    data: {
        blog: IBlogData;
        comments: IComment[];
    }
    message: string;
    server: string;
}


export interface IBlogs {
    data: IBlogData[];
    message: string;
    server: string;
}

export interface IComment {
    id: number;
    blog: string;
    text: string;
    created_at: string;
    updated_at: string;
    author: ShortUser;
    reply_to: number | null;
    replies: IComment[];
}