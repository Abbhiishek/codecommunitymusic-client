export interface IProjectData {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    tags: string[];
    tech_stack: string[];
    description: string;
    created_at: string;
    updated_at: string;
    is_published: boolean;
    is_featured: boolean;
    bannerImage: string;
    mainImage: string;
    demoLink: string;
    githubLink: string;
    author: string;
    collaborators: string[];
    upvotes: any[];
    bookmarks: any[];
    views: any[];
}

export interface IProjects {
    data: IProjectData[];
    messsage: string;
    server: string;
}


export interface IProject {
    data: {
        id: number;
        title: string;
        slug: string;
        subtitle: string;
        tags: string[];
        tech_stack: string[];
        description: string;
        created_at: string;
        updated_at: string;
        is_published: boolean;
        is_featured: boolean;
        bannerImage: string;
        mainImage: string;
        demoLink: string;
        githubLink: string;
        author: string;
        collaborators: string[];
        upvotes: any[];
        bookmarks: any[];
        views: any[];
    };
    messsage: string;
    server: string;
}