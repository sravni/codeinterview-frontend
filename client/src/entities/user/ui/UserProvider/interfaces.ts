import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { UserModel } from '../../model/user';

export type UserState = [UserModel | null, Dispatch<SetStateAction<UserModel | null>>]

export type UserProviderProps = {
    user: UserModel | null;
    children: React.ReactNode;
}