import { createContext } from "react";

import { UserModel } from "../../entities/user";
import { LANGUAGES } from "../../shared/consts/languages";
import { TerminalMessageModel } from "../../entities/terminalMessage";

export type InterviewRoomEditorContextState = string;
export type InterviewRoomCodeExecutingContextState = boolean;
export type InterviewRoomUsersContextState = UserModel[];
export type InterviewRoomTerminalContextState = TerminalMessageModel[];
export type InterviewRoomActionsContextState = {
    setEditorValue: (value: string) => void;
    executeCode: (code: string, language: LANGUAGES) => void;
    clearTerminal: () => void;
    closeRoom: () => void;
}

export const InterviewRoomEditorContext = createContext<InterviewRoomEditorContextState | null>(null);
export const InterviewRoomCodeExecutingContext = createContext<InterviewRoomCodeExecutingContextState | null>(null);
export const InterviewRoomUsersContext = createContext<InterviewRoomUsersContextState | null>(null);
export const InterviewRoomTerminalContext = createContext<InterviewRoomTerminalContextState | null>(null);
export const InterviewRoomActionsContext = createContext<InterviewRoomActionsContextState | null>(null);