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
        <section className="px-4 my-10 lg:container">
            <h1 className="text-xl">Marketplace</h1>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <MarketplaceSideNavBar />
                <div className="lg:col-span-9 col-span-12 h-[900px] ">
                    {children}
                </div>
            </div>
        </section>
    )
}