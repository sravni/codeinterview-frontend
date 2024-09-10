import { Typography } from "antd";
import cn from "classnames";

import { UserModel } from "../../model/user";
import { UserAvatar } from "../UserAvatar";
import styles from "./styles.module.css";

const { Text } = Typography;

export type UserAvatarWithNameProps = React.HTMLAttributes<HTMLDivElement> & {
    user: UserModel;
};

export const UserAvatarWithName = (props: UserAvatarWithNameProps) => { 
    const { user, className, ...rest } = props;   
    
    return (
        <div className={cn(className, styles.avatar)} {...rest}>
            <UserAvatar user={user} />
            <Text className={styles.name}>{user.displayName}</Text>
        </div>
    )
    
}