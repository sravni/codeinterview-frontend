import { Spin } from "antd";
import { UserAvatar as DefaultUserAvatar, UserAvatarProps as DefaultUserAvatarProps, useUserQuery } from "../../../entities/user"

export type UserAvatarProps = Omit<DefaultUserAvatarProps, "user"> & {
    userId: string;
}; 

export const UserAvatar = (props: UserAvatarProps) => {
    const { userId, ...rest } = props;
    const { isLoading, data } = useUserQuery({ userId })

    if (isLoading) {
        return <Spin/>
    }

    if (!data)
        return null;
    
    return (
        <DefaultUserAvatar user={data} {...rest} />
    )
}