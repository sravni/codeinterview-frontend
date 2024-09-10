declare global {
    interface Window {
        __ENV__: Record<string, string>;
        __INITIAL_STATE__: Record<string, any>;
    }
}

export { }