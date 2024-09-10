import { ReactNode } from "react";
import { UserModel } from "../../model/user"

export type AdminSectionProps = {
    user: UserModel;
    children: ReactNode;
}
export const AdminSection = (props: AdminSectionProps) => {
    const { user, children } = props;

    if (user.isAdmin) return <>{children}</>;

    return null;
}