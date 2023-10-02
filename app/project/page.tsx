import axios from "axios";
import Projects from "./Projects";

import { Metadata } from 'next';

export const revalidate = 20;

export const metadata: Metadata = {
    title: 'Projects | Code Community Music',
    abstract: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
    category: 'Projects',
    creator: 'Code Community Music',
    publisher: 'Code Community Music',
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Code Community Music',
        description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
        creator: '@CodeCommMusicHQ',
        images: ['https://pbs.twimg.com/profile_images/1646354688378552320/v7MYAeHr_400x400.jpg'],
    },
    description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
    keywords: ['projects', 'code community music', 'code community', 'code', 'community', 'music', 'developers', 'designers', 'project', 'developer', 'designer'],
    openGraph: {
        title: 'Projects | Code Community Music',
        description: 'Explore the projects created by the Code Community Music team, Developers, Designers.',
        type: 'website',
        url: 'https://codecommunitymusic.vercel.app/project',
        locale: 'en',
    },

}


async function Project() {

    const { data } = await axios.get(`${process.env.BACKEND_URL}/list/projects`)
    return (
        <Projects projectData={data?.data!} />
    )
}

export default Project;