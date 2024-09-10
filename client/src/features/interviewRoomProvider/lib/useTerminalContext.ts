import { useContext } from "react";
import { InterviewRoomTerminalContext } from "../context";

export function useTerminalContext() {
  const messages = useContext(InterviewRoomTerminalContext);

  if (messages === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return messages;
}
