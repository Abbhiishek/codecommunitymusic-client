

import SideNavBar from "@/components/dashboard/SideNavBar";


export const metadata = {
    title: 'Dashboard - ccm',
    description: 'CodeCommunityMusic is a community of developers and musicians who are passionate about music and code.',
};


export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col gap-5 p-2 mt-2 lg:container lg:mt-10 lg:flex-row">
            <SideNavBar />
            {children}
        </section>
    )
}