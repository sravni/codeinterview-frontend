import { useCallback, useMemo } from "react";
import { notification } from "antd";

import { useEditor } from "../lib/useEditor";
import { useWebsockets } from "../lib/useWebsockets";
import { useUsers, UseUsersProps } from "../lib/useUsers";
import { useTerminal, UseTerminalProps } from "../lib/useTerminal";
import { useCodeExecuting } from "../lib/useCodeExecuting";
import { InterviewRoomActionsContext, InterviewRoomActionsContextState, InterviewRoomCodeExecutingContext, InterviewRoomEditorContext, InterviewRoomTerminalContext, InterviewRoomUsersContext } from "../context";
import { CodeExecutedEvent, CodeExecutingEvent, EditorUpdatedEvent, ExceptionEvent,UsersListUpdatedEvent, TerminalClearedEvent } from "../lib/useWebsockets/interfaces";
import { LANGUAGES } from "../../../shared/consts/languages";
import { TerminalMessageModel } from "../../../entities/terminalMessage";
import { TYPE } from "../../../entities/terminalMessage/consts";
import { UserModel, useUser } from "../../../entities/user";
import { InterviewPublicModel } from "../../../entities/interview";


export type InterviewRoomProviderProps = UseUsersProps & UseTerminalProps & {
    interview: InterviewPublicModel;
    children?: React.ReactNode;
}

export const InterviewRoomProvider = (props: InterviewRoomProviderProps) => {
    const { interview, children, users: initialUsers, messages: initialMessages } = props;
    const [user] = useUser();
    
    const [code, setEditorValue] = useEditor({ code: interview.code });
    const [users, usersActions] = useUsers({ users: initialUsers });
    const [messages, terminalActions] = useTerminal({ messages: initialMessages });
    const [isCodeExecuting, setIsCodeExecuting] = useCodeExecuting(false);

    const handleExceptionEvent = useCallback((event: ExceptionEvent) => { notification.error({ message: `Ошибка WebSocket`, description: <>{Array.isArray(event.message) ? event.message.map(e => (<>{e}<br/></>)): event.message}</> }); }, []);
    const handleUsersListUpdatedEvent = useCallback((event: UsersListUpdatedEvent) => { usersActions.setUsers(event.users.map(userDto => new UserModel(userDto))) }, [usersActions]);
    const handleEditorUpdatedEvent = useCallback((event: EditorUpdatedEvent) => { setEditorValue(event.code) }, [setEditorValue]);
    const handleRoomClosedEvent = useCallback(() => { if (!user?.isAdmin) { window.location.reload() }}, [user?.isAdmin]);
    const handleCodeExecutingEvent = useCallback((event: CodeExecutingEvent) => { setIsCodeExecuting(event.isExecuting) }, [setIsCodeExecuting]);
    const handleCodeExecutedEvent = useCallback((event: CodeExecutedEvent) => {
        const { user, data } = event;
        setIsCodeExecuting(false);
        terminalActions.setMessage(new TerminalMessageModel({ user, type: TYPE.RESULT, data }))
    }, [setIsCodeExecuting, terminalActions]);
    const handleTerminalClearedEvent = useCallback((event: TerminalClearedEvent) => { 
        const { user } = event;
        terminalActions.clearMessages();
        terminalActions.setMessage(new TerminalMessageModel({ user, type: TYPE.CLEAR }));
    }, [terminalActions]);

    const {
        sendEditorUpdateEvent,
        sendRoomCloseEvent,
        sendCodeExecuteEvent,
        sendTerminalClearEvent,
    } = useWebsockets({
        interviewId: interview.id,
        onExceptionEvent: handleExceptionEvent,
        onUsersListUpdatedEvent: handleUsersListUpdatedEvent,
        onEditorUpdatedEvent: handleEditorUpdatedEvent,
        onRoomClosedEvent: handleRoomClosedEvent,
        onCodeExecutingEvent: handleCodeExecutingEvent,
        onCodeExecutedEvent: handleCodeExecutedEvent,
        onTerminalClearedEvent: handleTerminalClearedEvent,
    });

    const interviewRoomActions: InterviewRoomActionsContextState = useMemo(() => ({
        setEditorValue: (value: string) => { setEditorValue(value); sendEditorUpdateEvent(value) },
        executeCode: (code: string, language: LANGUAGES) => { sendCodeExecuteEvent(code, language) },
        clearTerminal: () => { sendTerminalClearEvent() },
        closeRoom: () => { sendRoomCloseEvent() },
    }), [sendCodeExecuteEvent, sendEditorUpdateEvent, sendRoomCloseEvent, sendTerminalClearEvent, setEditorValue]);

    return (
        <InterviewRoomEditorContext.Provider value={code}>
            <InterviewRoomCodeExecutingContext.Provider value={isCodeExecuting}>
                <InterviewRoomTerminalContext.Provider value={messages}>
                    <InterviewRoomUsersContext.Provider value={users}>
                        <InterviewRoomActionsContext.Provider value={interviewRoomActions}>
                            {children}
                        </InterviewRoomActionsContext.Provider>
                    </InterviewRoomUsersContext.Provider>
                </InterviewRoomTerminalContext.Provider>
            </InterviewRoomCodeExecutingContext.Provider>
        </InterviewRoomEditorContext.Provider>
    );
}