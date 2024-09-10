import { useContext } from "react";
import { InterviewRoomUsersContext } from "../context";

export function useUsersIdsContext() {
  const usersIds = useContext(InterviewRoomUsersContext);

  if (usersIds === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return usersIds;
}
