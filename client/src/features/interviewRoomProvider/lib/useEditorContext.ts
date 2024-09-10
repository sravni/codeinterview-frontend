import * as React from 'react';
import { InterviewRoomEditorContext } from '../context';

export function useEditorContext() {
  const value = React.useContext(InterviewRoomEditorContext);

  if (value === null)
    throw new Error('Hook must be used inside InterviewRoomProvider');

  return value;
}