
export default async function sitemap() {



    const staticPages = [
        '',
        'project',
        'blog',
        'profile',
        'dashboard',
        'leaderboard',
        'setting',
        'marketplace',
        'forum'
    ].map((url) => ({
        url: `/${url}`,
        changefreq: "daily",
        priority: 0.7,
        lastModified: new Date(),
    }));


    return {
        hostname: "https://codecommunitymusic.vercel.app",
        cacheTime: 600000,
        gzip: true,
        urls: [...staticPages],
    };
}
