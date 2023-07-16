import { ShortUser } from "./Author";
import { Course } from "./Course";

export interface LearningPath {
    slug: string;
    courses_count: number;
    students_count: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    about: string;
    level: string;
    is_Active: boolean;
    authors: ShortUser[];
    students: ShortUser[];
    courses: Course[];
    resources: string[];
}