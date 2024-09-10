import { useContext } from "react";
import { InterviewRoomUsersContext } from "../context";

export function useUsersContext() {
  const users = useContext(InterviewRoomUsersContext);

  if (users === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return users;
}
