import { UserDto } from "../../entities/user/api/interfaces"

export type InitialState = {
    user?: UserDto;
}

export const initialState: InitialState = {
    ...(window?.__INITIAL_STATE__?.user ? { user: window?.__INITIAL_STATE__.user } :  { }),
}