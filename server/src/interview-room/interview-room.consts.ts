export enum EVENTS {
  // System Message
  EXCEPTION = 'exception',

  // Application Message
  USER_JOIN_ROOM = 'userJoinRoom',
  USER_LEAVE_ROOM = 'userLeaveRoom',
  USERS_LIST_UPDATED = 'usersListUpdated',

  EDITOR_UPDATE = 'editorUpdate',
  EDITOR_UPDATED = 'editorUpdated',

  CODE_EXECUTE = 'codeExecute',
  CODE_EXECUTING = 'codeExecuting',
  CODE_EXECUTED = 'codeExecuted',

  TERMINAL_CLEAR = 'terminalClear',
  TERMINAL_CLEARED = 'terminalCleared',

  ROOM_CLOSE = 'roomClose',
  ROOM_CLOSED = 'roomClosed',
}
