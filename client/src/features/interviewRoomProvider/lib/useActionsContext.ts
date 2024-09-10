import * as React from 'react';
import { InterviewRoomActionsContext } from '../context';

export function useActionsContext() {
  const value = React.useContext(InterviewRoomActionsContext);

  if (value === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return value;
}