import { OrgControl } from "./_components/org-control";

const organizationIdLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <OrgControl/>
            {children}
        </div>
    );
};

export default organizationIdLayout;