import cn from "classnames";

import { UserAvatarWithName } from "../../../entities/user";
import { useUsers } from "../../../features/interviewRoomProvider";

import styles from "./styles.module.css";

export type InterviewRoomUsersListProps = React.HTMLAttributes<HTMLDivElement>;

export const InterviewRoomUsersList = (props: InterviewRoomUsersListProps) => { 
    const { className, ...rest } = props;
    const users = useUsers();

    return (
        <>
            <div className={cn(styles.users, className)} {...rest}>
                {
                    users.map(user => <UserAvatarWithName user={user} className={styles.badge} />)
                }
            </div>
        </>
    );
}