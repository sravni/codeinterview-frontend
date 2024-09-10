import { useReducer, useMemo } from 'react';

import { UserModel } from '../../../entities/user';

enum ACTION {
  SET_USERS = 'setUsers',
  CLEAR_USERS = 'clearUsers',
}

type SetUsersAction = {
  type: ACTION.SET_USERS;
  payload: UserModel[];
}

type ClearUsersAction = {
  type: ACTION.CLEAR_USERS;
  payload?: undefined
}

type UsersListActions = {
  setUsers: (users: SetUsersAction['payload']) => void;
  clearUsers: () => void;
}

const DEFAULT_STATE = [] as UserModel[];

function reducer(state: UseUsersProps['users'], action: SetUsersAction | ClearUsersAction) {
  const { type, payload } = action;

  switch (type) {
    case ACTION.SET_USERS:
      return payload;
    case ACTION.CLEAR_USERS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export type UseUsersProps = {
    users: UserModel[];
};

export const useUsers = (props: UseUsersProps) => {
  const { users: initialUsers = DEFAULT_STATE } = props;
  const [users, dispatch] = useReducer(reducer, initialUsers);

  const actions:UsersListActions = useMemo(() => ({
    setUsers: (users) => { dispatch({ type: ACTION.SET_USERS, payload: users }) },
    clearUsers: () => { dispatch({ type: ACTION.CLEAR_USERS })}
  }), [dispatch]);

  return [users, actions] as [UserModel[], UsersListActions]
};
