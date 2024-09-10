import { Avatar } from "antd"
import { AvatarProps } from "antd/lib/avatar"
import { UserModel } from "../../model/user";

export type UserAvatarProps = Omit<AvatarProps, 'src'> & {
    user: UserModel;
};

export const UserAvatar = (props: UserAvatarProps) => { 
    const { user, ...rest } = props;
    const { photo, displayName } = user;
    const letters = displayName.split(' ').map(item => item.charAt(0)).filter(Boolean).join('');
    
    return (
        <Avatar shape='circle' style={{ backgroundColor: user.color }} {...rest} src={photo}>
            {letters}
        </Avatar>
    )
    
}