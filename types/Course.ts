import { ShortUser } from "./Author";

export interface Course {
    slug: string;
    authors: ShortUser[];
    students_count: number;
    lessons_count: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    about: string;
    is_Active: boolean;
    students: ShortUser[];
    sub_courses: Course[];
    resources: string[];
}