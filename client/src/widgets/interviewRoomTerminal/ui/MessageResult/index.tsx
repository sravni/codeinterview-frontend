import cn from "classnames";

import { TerminalMessageModel } from "../../../../entities/terminalMessage"

import styles from "./styles.module.css";

export type MessageResultProps = React.HTMLAttributes<HTMLDivElement> & {
    message: TerminalMessageModel;
};

export const MessageResult = (props: MessageResultProps) => {
    const { className, message, ...rest } = props;
    const { user, data } = message;

    if (!data) return null;    
    
    const { output, duration, error } = data
    const clearOutput = output && output.trim();

    return (
        <div className={cn(styles.message, className)} {...rest}>
            <div className={styles.info}>
                Compiling started by <strong>{ user.displayName }</strong> <span>it took {new Intl.NumberFormat('ru-RU').format((duration % 60000) / 1000)} s</span>
            </div>
            {
                clearOutput
                    ? (
                        <div className={styles.output}>{clearOutput}</div>
                    )
                    : null
            }
            {
                error
                    ? (
                        <div className={styles.error}>{error}</div>
                    )
                    : null
            }
        </div>
    )
}