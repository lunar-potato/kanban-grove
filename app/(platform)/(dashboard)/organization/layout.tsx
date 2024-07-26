const organizationLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-2-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    {/* Sidebar */}
                </div>
            {children}
            </div>
        </main>
    );
};

export default organizationLayout;