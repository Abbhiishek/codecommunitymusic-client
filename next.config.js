/** @type {import('next').NextConfig} */
const remobeImports = require('next-remove-imports')();
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        domains: ['images.unsplash.com',
            'res.cloudinary.com', 't4.ftcdn.net', 'i.ytimg.com', 'camo.githubusercontent.com',
            'avatars.githubusercontent.com', 'wiidgets.vercel.app', 'img.freepik.com', 'github.com', 'pbs.twimg.com', 'source.unsplash.com', 'images.unsplash.com']
    },
};

module.exports = remobeImports(nextConfig);
