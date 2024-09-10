import * as React from 'react';
import { InterviewRoomCodeExecutingContext } from '../context';

export function useCodeExecutingContext() {
  const value = React.useContext(InterviewRoomCodeExecutingContext);

  if (value === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return value;
}