import { useEffect, useMemo, useRef } from "react";
import { Socket, io } from "socket.io-client";

import { EVENT } from "./contsts";
import { CodeExecutedEvent, CodeExecutingEvent, EditorUpdateEvent, EditorUpdatedEvent, ExceptionEvent, UsersListUpdatedEvent, RoomClosedEvent, TerminalClearedEvent } from "./interfaces";
import { LANGUAGES } from "../../../../shared/consts/languages";
import { runtimeEnv } from "../../../../shared/consts/runtimeEnv";
import { useUser } from "../../../../entities/user";

export type UseWebsocketsProps = {
    interviewId: string;
    onExceptionEvent: (event: ExceptionEvent) => void;
    onUsersListUpdatedEvent: (event: UsersListUpdatedEvent) => void;
    onEditorUpdatedEvent: (event: EditorUpdatedEvent) => void;
    onCodeExecutingEvent: (event: CodeExecutingEvent) => void;
    onCodeExecutedEvent: (event: CodeExecutedEvent) => void;
    onRoomClosedEvent: () => void;
    onTerminalClearedEvent: (event: TerminalClearedEvent) => void;
};

export const useWebsockets = (props: UseWebsocketsProps) => {
    const socketRef = useRef<Socket | null>(null);
    const [user] = useUser();
    
    const {
        interviewId,
        onExceptionEvent: handleExceptionEvent,
        onUsersListUpdatedEvent: handleUsersListUpdatedEvent,        
        onEditorUpdatedEvent: handleEditorUpdatedEvent,
        onRoomClosedEvent: handleRoomClosedEvent,
        onCodeExecutingEvent: handleCodeExecutingEvent,
        onCodeExecutedEvent: handleCodeExecutedEvent,
        onTerminalClearedEvent: handleTerminalClearedEvent
    } = props;

    useEffect(() => {
        const url = runtimeEnv.INTERVIEW_ROOM_WEBSOCKET;

        if (!url) throw new Error('Interview Room Websocket url is not defined')
        
        if (!user) throw new Error('User must exist');
        
        const socket = io(url, {
            timeout: 60 * 1000,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 10,
            transports: ['websocket'],
        });

        socket.on(EVENT.CONNECT, () => { socket.emit(EVENT.USER_JOIN_ROOM, { roomId: interviewId, user }) });
        socket.on(EVENT.EXCEPTION, handleExceptionEvent);

        socket.on(EVENT.USERS_LIST_UPDATED, handleUsersListUpdatedEvent);

        socket.on(EVENT.EDITOR_UPDATED, handleEditorUpdatedEvent);
        socket.on(EVENT.ROOM_CLOSED, handleRoomClosedEvent);

        socket.on(EVENT.CODE_EXECUTING, handleCodeExecutingEvent);
        socket.on(EVENT.CODE_EXECUTED, handleCodeExecutedEvent);

        socket.on(EVENT.TERMINAL_CLEARED, handleTerminalClearedEvent);

        socket.connect();

        socketRef.current = socket;

        return () => {
            socket.removeAllListeners();
            socket.close();
        };
    }, [interviewId, handleEditorUpdatedEvent, handleExceptionEvent, handleRoomClosedEvent, handleCodeExecutingEvent, handleCodeExecutedEvent, handleTerminalClearedEvent, handleUsersListUpdatedEvent, user]);
    

    const actions = useMemo(() => ({ 
        sendEditorUpdateEvent: (value: string) => { socketRef.current?.emit(EVENT.EDITOR_UPDATE, { code: value, roomId: interviewId, interviewId } as EditorUpdateEvent) },
        sendRoomCloseEvent: () => { socketRef.current?.emit(EVENT.ROOM_CLOSE, { roomId: interviewId } as RoomClosedEvent) },
        sendCodeExecuteEvent: (code: string, language: LANGUAGES) => { socketRef.current?.emit(EVENT.CODE_EXECUTE, { code, roomId: interviewId, language }) },
        sendTerminalClearEvent: () => { socketRef?.current?.emit(EVENT.TERMINAL_CLEAR, { roomId: interviewId }) }
    }), [interviewId]);

    return actions;
}