export interface UserData {
    data: User;
    message: string;
    server: string;
    time_taken: string;
}


export interface User {
    username: string;
    bio: string;
    first_name: string;
    last_name: string;
    display_name: string;
    profession: string;
    karma: number;
    email: string;
    skills: string[];
    interests: string[];
    gender: string;
    age: number;
    phone: number;
    location: string;
    profile_pic: string;
    banner_pic: string;
    followers: string[];
    following: string[];
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    is_admin: boolean;
    is_banned: boolean;
    is_public: boolean;
}