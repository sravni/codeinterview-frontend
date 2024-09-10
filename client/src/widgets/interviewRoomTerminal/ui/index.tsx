import { useEffect, useRef } from 'react';
import cn from 'classnames';

import { useTerminal } from '../../../features/interviewRoomProvider';
import { TYPE } from '../../../entities/terminalMessage/consts';

import { MessageResult } from './MessageResult';
import { MessageClear } from './MessageClear';

export type InterviewRoomTerminalProps = React.HTMLAttributes<HTMLDivElement>;

export const InterviewRoomTerminal = (props: InterviewRoomTerminalProps) => { 
    const { className, ...rest } = props;

    const messages = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }, [messages]);


    return (
        <section className={cn('terminal', className)} {...rest}>
            {
                messages.length === 0 ? 'Welcome' : null
            }
            {
                messages.map((message, index) => {
                    switch (message.type) {
                        case TYPE.RESULT:
                            return <MessageResult message={message} key={index} />
                        case TYPE.CLEAR:
                            return <MessageClear message={message} key={index} />
                        default:
                            const unknownType: never = message.type;
                            throw new Error(`Неизвестное сообщение с типом - ${unknownType}`);
                    }
                })
            }
            <div ref={bottomRef} />
        </section>
    )
};
