import { ShortUser } from "./Author";

export interface IForumData {
    slug: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    type: string;
    is_closed: boolean;
    is_solved: boolean;
    author: ShortUser;
    upvotes: ShortUser[];
}




export interface IForum {
    data: IForumData;
    comments: IChat[];
    message: string;
}

export interface IForums {
    data: IForumData[];
    message: string;
}


export interface IChat {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    author: ShortUser;
    reply_to: number | null;
    replies: IChat[];
}