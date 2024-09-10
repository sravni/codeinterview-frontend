import { ConfigProvider, theme } from 'antd';
import { isAxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NetworkError } from '../../../shared/lib/errors/network';
import { UserProvider } from '../../../entities/user';
import { initialState } from '../../../shared/consts/initialState';
import { UserModel } from '../../../entities/user';

const MAX_RETRIES = 3;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
const queryClient = new QueryClient({
  defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (!isAxiosError(error))
                    return false;

                if (failureCount + 1 >= MAX_RETRIES) {
                    return false;
                }

                if (
                    error instanceof NetworkError && 
                    HTTP_STATUS_TO_NOT_RETRY.includes(error.status)
                ) {
                    console.log(`Aborting retry due to ${error.status} status`);
                    return false;
                }

                return true;
            },
        }
    },
});
const user = initialState?.user ? new UserModel(initialState.user) : null;

export type ProvidersProps = {
    children: React.ReactElement
}

export const Providers = (props: ProvidersProps) => { 
    const { children } = props;

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    components: {
                        Layout: {
                            footerBg: '#252626'
                        }
                    }
                }}
            >
                <UserProvider user={user}>
                    {children}
                </UserProvider>
            </ConfigProvider>
        </QueryClientProvider>
    )
}