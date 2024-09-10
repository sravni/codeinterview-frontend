import * as React from 'react';

import type { UserState } from './interfaces';
import { UserContext } from './provider';

export function useUser(): UserState {
  const state = React.useContext(UserContext);

  if (state === null)
    throw new Error('Hook must be used inside UserProvider');

  return state
}

