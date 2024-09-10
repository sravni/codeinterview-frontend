import { Badge, BadgeProps, Spin, Typography } from "antd";
import cn from "classnames";

import { useUserQuery } from "../../../entities/user";

import styles from "./styles.module.css";

export type UserBadgeNameProps = BadgeProps & {
    userId: string;
};

export const UserBadgeName = (props: UserBadgeNameProps) => {
    const { userId, className, ...rest } = props;
    const { isLoading, isError, data  } = useUserQuery({ userId })
    if (isLoading) {
        return <Spin/>
    }

    if (isError || !data) {
        return <Typography.Text>Ошибка!</Typography.Text>
    }
    
    const { displayName, color } = data;

    return (
        <Badge key={displayName} color={color} text={displayName} className={cn(styles.badge, className)} {...rest} />
    )
}