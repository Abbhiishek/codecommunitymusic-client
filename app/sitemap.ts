import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {

    return [
        {
            url: 'codecommunitymusic.vercel.app',
            lastModified: new Date(),
        },
        {
            url: 'codecommunitymusic.vercel.app/forum',
            lastModified: new Date(),
        },
        {
            url: 'codecommunitymusic.vercel.app/blog',
            lastModified: new Date(),
        },
        {
            url: 'codecommunitymusic.vercel.app/project',
            lastModified: new Date(),
        },
    ]


}
