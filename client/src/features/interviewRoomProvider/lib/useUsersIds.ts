import { useReducer, useMemo } from 'react';

import { UserModel } from '../../../entities/user';

enum ACTION {
  SET_USERS_IDS = 'setUsersIds',
  CLEAR_USERS_IDS = 'clearUsersIds',
}

type UserId = UserModel['id'];

type SetUsersIdsAction = {
  type: ACTION.SET_USERS_IDS;
  payload: UserId[];
}

type ClearUsersIdsAction = {
  type: ACTION.CLEAR_USERS_IDS;
  payload?: undefined
}

type UsersListActions = {
  setUsersIds: (users: SetUsersIdsAction['payload']) => void;
  clearUsersIds: () => void;
}

const DEFAULT_STATE = [] as UserId[];

function reducer(state: UseUsersIdsProps['usersIds'], action: SetUsersIdsAction | ClearUsersIdsAction) {
  const { type, payload } = action;

  switch (type) {
    case ACTION.SET_USERS_IDS:
      return payload;
    case ACTION.CLEAR_USERS_IDS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export type UseUsersIdsProps = {
    usersIds: UserId[];
};

export const useUsersIds = (props: UseUsersIdsProps) => {
  const { usersIds: initialUsersIds = DEFAULT_STATE } = props;
  const [users, dispatch] = useReducer(reducer, initialUsersIds);

  const actions:UsersListActions = useMemo(() => ({
    setUsersIds: (usersIds) => { dispatch({ type: ACTION.SET_USERS_IDS, payload: usersIds }) },
    clearUsersIds: () => { dispatch({ type: ACTION.CLEAR_USERS_IDS })}
  }), [dispatch]);

  return [users, actions] as [UserId[], UsersListActions]
};
