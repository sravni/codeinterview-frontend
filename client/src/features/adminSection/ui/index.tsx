import { AdminSection as DefaultAdminSection, AdminSectionProps as DefautlAdminSectionProps, useUser } from "../../../entities/user";

export type AdminSectionProps = Omit<DefautlAdminSectionProps, 'user'>;

export const AdminSection = (props: AdminSectionProps) => {
    const [user] = useUser();

    if (user === null) return null;
    
    return <DefaultAdminSection user={ user } { ...props } />
}