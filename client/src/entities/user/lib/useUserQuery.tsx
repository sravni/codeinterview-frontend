import { useQuery } from "@tanstack/react-query";
import { REQUEST_KEY } from "../consts";
import { UserModel } from "../model/user";
import { UserApi } from "../api";

export type UseUserQueryProps = {
    userId: UserModel['id']
}
export const useUserQuery = (props: UseUserQueryProps) => {
    const { userId } = props;

    return useQuery({
        queryKey: [REQUEST_KEY.GET_USER, userId],
        queryFn: () => UserApi.getUser(userId),
        staleTime: 60 * 60 * 1000,
    });
}