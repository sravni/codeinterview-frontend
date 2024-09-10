import { useReducer, useMemo } from 'react';

import { TerminalMessageModel } from '../../../entities/terminalMessage';

const DEFAULT_STATE = [] as TerminalMessageModel[];

enum ACTION {
    SET_MESSAGE = 'setTerminalMessage',
    CLEAR_MESSAGES = 'clearTerminalMessages',
}

type SetTerminalMessageAction = {
  type: ACTION.SET_MESSAGE;
  payload: TerminalMessageModel;
}

type ClearTerminalMessagesAction = {
  type: ACTION.CLEAR_MESSAGES;
  payload?: undefined
}

type TerminalListActions = {
  setMessage: (message: SetTerminalMessageAction['payload']) => void;
  clearMessages: () => void;
}

function reducer(state: UseTerminalProps['messages'], action: SetTerminalMessageAction | ClearTerminalMessagesAction) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.SET_MESSAGE:
      return [
        ...state,
        payload
      ];    
    case ACTION.CLEAR_MESSAGES:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export type UseTerminalProps = {
    messages: TerminalMessageModel[];
};

export const useTerminal = (props: UseTerminalProps) => {
  const { messages: initialTerminalMessages = DEFAULT_STATE } = props;
  const [messages, dispatch] = useReducer(reducer, initialTerminalMessages);

  const actions:TerminalListActions = useMemo(() => ({
    setMessage: (message) => { dispatch({ type: ACTION.SET_MESSAGE, payload: message }) },
    clearMessages: () => { dispatch({ type: ACTION.CLEAR_MESSAGES })}
  }), [dispatch]);

  return [messages, actions] as [ TerminalMessageModel[], TerminalListActions]
};
