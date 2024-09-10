import { Flex, FlexProps, Typography } from "antd";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export type TopMenuProps = Omit<FlexProps, 'children'>;

export const TopMenu = (props: TopMenuProps) => {
    const { className, ...rest } = props;

    return (
        <Flex className={cn(className)} gap="middle" align="start" {...rest}>
            <NavLink to={`/interviews`}>
                {
                    ({ isActive }) => (
                        <Typography.Link type={isActive ? "success" : undefined}>Интервью</Typography.Link>
                    )
                }
            </NavLink>
            <NavLink to={`/codeTasks`}>
                {
                    ({ isActive }) => (
                        <Typography.Link type={isActive ? "success" : undefined}>Задания</Typography.Link>
                    )
                }
            </NavLink>
        </Flex>
    )
}