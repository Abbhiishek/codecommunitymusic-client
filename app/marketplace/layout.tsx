import MarketplaceSideNavBar from "@/components/marketplace/MarketplaceSideNavBar";



export const metadata = {
    title: 'Marketplace 🛒 - ccm',
    description: 'CodeCommunityMusic is a community of developers and musicians who are passionate about music and code.',
};

export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col gap-5 p-2 mt-2 lg:container lg:mt-10 lg:flex-row">
            <MarketplaceSideNavBar />
            {children}
        </section>
    )
}