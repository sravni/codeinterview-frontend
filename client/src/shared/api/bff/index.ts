import axios, { isAxiosError } from "axios";
import { createNetworkError } from "../../lib/errors/errorFabric";
import { runtimeEnv } from "../../consts/runtimeEnv";


export class BffApi {
    protected static _url = new URL(runtimeEnv.BFF);
    protected static _httpClient = (() => {
        const instance = axios.create({
            timeout: 5000,
            responseType: "json",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
   
        instance.interceptors.response.use(
            (_) => _,
            (error) => {
                if (isAxiosError(error)) {
                    if (!error.response) {
                        return Promise.reject(
                            createNetworkError(error.status || 500, { message: error.message })
                        );
                    }

                    return Promise.reject(
                        createNetworkError(error.response.status || 500, { message: error.message })
                    );
                }

                return Promise.reject(error);
            }
        );
        return instance;
    })();
}