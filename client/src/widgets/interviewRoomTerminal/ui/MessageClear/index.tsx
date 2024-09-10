import cn from "classnames";

import { TerminalMessageModel } from "../../../../entities/terminalMessage";

import styles from "./styles.module.css";

export type MessageClearProps = React.HTMLAttributes<HTMLDivElement> & {
    message: TerminalMessageModel;
};

export const MessageClear = (props: MessageClearProps) => {
    const { message, className, ...rest } = props;
    const { user } = message;
    
    return (
        <div className={cn(styles.message, className)} {...rest}>
            <div className={styles.info}>
                Cleared by <strong >{ user.displayName }</strong>
            </div>
        </div>
    )
}