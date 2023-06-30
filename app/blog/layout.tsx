
export const metadata = {
    title: 'Blogs | Code Community Music',
    description: 'Code Community Music - Blogs',
};


export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="container mt-5">
            {children}
        </section>
    )
}