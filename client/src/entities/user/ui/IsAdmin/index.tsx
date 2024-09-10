import { ReactNode } from "react";
import { UserModel } from "../../model/user"

export type IsAdminProps = {
    user: UserModel;
    children: ReactNode;
}
export const IsAdmin = (props: IsAdminProps) => {
    const { user, children } = props;

    if (user.isAdmin) return <>{children}</>;

    return null;
}