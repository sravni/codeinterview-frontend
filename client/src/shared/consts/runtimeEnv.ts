type RuntimeEnv = {
    BFF: string;
    INTERVIEW_ROOM_WEBSOCKET: string
}
export const runtimeEnv: RuntimeEnv = {
    // process for development enviroment
    BFF: window?.__ENV__?.BFF || process.env.REACT_APP_BFF || '',
    // process for development enviroment
    INTERVIEW_ROOM_WEBSOCKET: window?.__ENV__?.INTERVIEW_ROOM_WEBSOCKET || process.env.REACT_APP_INTERVIEW_ROOM_WEBSOCKET || '',
}