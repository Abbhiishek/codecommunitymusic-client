import SettingSideNavBar from "@/components/setting/SideNavBar";



export const metadata = {
    title: 'Setting ⚙️ - ccm',
    description: 'CodeCommunityMusic is a community of developers and musicians who are passionate about music and code.',
};



export default function SettingLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="px-4 my-10 lg:container">
            <h1 className="text-xl">Account Settings</h1>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <SettingSideNavBar />
                <div className="lg:col-span-9 col-span-12 h-[900px] ">
                    {children}
                </div>
            </div>
        </section>
    )
}
