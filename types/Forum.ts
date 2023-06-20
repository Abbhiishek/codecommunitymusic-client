export interface IForumData {
    title: string;
    description: string;
    created_at: string;
    author: string;
    chat: IChat[];
    upvotes: string[];
    tags: string[];
    type: string;
    slug: string;
    is_closed: boolean;
    is_solved: boolean;
}

export interface IForum {
    data: IForumData;
    chat: IChat[];
    message: string;
}

export interface IForums {
    data: IForumData[];
    message: string;
}


export interface IChat {
    content: string;
    created_at: Date;
    author: string;
    upvotes: string[];
    reply: IChat[];
}