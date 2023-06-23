import axios from "axios";

export default async function sitemap() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const allprojects = res.data;

    const posts = allprojects.map((project: any) => ({
        url: `/project/${project.id}`,
        changefreq: "daily",
        priority: 0.7,
        lastModified: new Date(project.updatedAt),
    }));


    const staticPages = [
        '',
        'about',
        'contact',
        'projects',
        'blog',
        'login',
        'register',
        'forgot-password',
        'reset-password',
        'profile',
        'dashboard',
        'leaderboard',
        'settings',
        'marketplace'
    ].map((url) => ({
        url: `/${url}`,
        changefreq: "daily",
        priority: 0.7,
        lastModified: new Date(),
    }));


    return {
        hostname: "https://www.example.com",
        cacheTime: 600000,
        gzip: true,
        urls: [...posts, ...staticPages],
    };
}
