import React, { useState } from 'react';

import type { UserProviderProps, UserState } from './interfaces';

export const UserContext = React.createContext<UserState>([null, () => null]);

export const UserProvider = (props: UserProviderProps) => {
  const { user = null, children } = props;
  const state = useState(user);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
