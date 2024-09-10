import { useState } from "react";

export const useCodeExecuting = (isExecuting: boolean = false) => {
    return useState<boolean>(isExecuting);
};
