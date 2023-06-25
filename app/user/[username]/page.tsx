
import { User } from "@/types/User";
import axios from "axios";
import UserProfile from "./UserProfile";

interface Props {
    params: {
        username: string
    }
}


export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getalluserusername`)
    return data.users.map((user: any) => ({
        params: {
            username: user.username
        }
    }))
}

export async function generateMetadata({ params }: Props) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getalluserusername`)
    const user: User = data.users.find((user: any) => user.username === params.username)
    return {
        title: user?.display_name || user?.username,
        description: user?.bio,
        type: "profile",
        keywords: [user?.username, user?.display_name, user?.bio],
        openGraph: {
            title: user?.display_name || user?.username,
            description: user?.bio,
            type: "profile",
            publishedTime: user?.created_at,
            authors: [user?.username],
        },
    }
}


function ProfilePage({ params }: Props) {


    return (
        <UserProfile username={params.username} />
    );
}


export default ProfilePage;