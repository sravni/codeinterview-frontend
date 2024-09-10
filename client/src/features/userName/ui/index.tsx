import { Spin, Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";

import { useUserQuery } from "../../../entities/user";

export type UserNameProps = TextProps & {
    userId: string;
};

export const UserName = (props: UserNameProps) => {
    const { userId, ...rest } = props;
    const { isLoading, isError, data } = useUserQuery({ userId });

    if (isLoading) {
        return <Spin/>
    }

    if (isError || !data) {
        return <Typography.Text {...rest}>Ошибка запроса</Typography.Text>
    }
    
    const { displayName } = data;

    return (
        <Typography.Text {...rest}>{displayName}</Typography.Text>
    )
}