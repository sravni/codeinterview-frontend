import { UserDto } from "../../../../entities/user/api/interfaces";

export type ExceptionEvent = {
    message: string | string[];
}

export type UsersListUpdatedEvent = {
    users: UserDto[];
}

export type EditorUpdateEvent = {
    roomId: string;
    interviewId: string;
    code: string;
}

export type EditorUpdatedEvent = {
    code: string;
}

export type RoomClosedEvent = {
    roomId: string;
}

export type CodeExecutingEvent = {
    isExecuting: boolean;
}

export type CodeExecutedEvent = {
    user: UserDto;
    data: {
        output: string | null;
        error: string | null;
        duration: number;
    }
}

export type TerminalClearedEvent = {
    user: UserDto;
}