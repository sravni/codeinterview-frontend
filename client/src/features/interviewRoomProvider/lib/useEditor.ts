import { useState } from "react";

export type UseEditorProps = {
    code?: string;
}

const DEFAULT_STATE = '';

export const useEditor = (props: UseEditorProps) => {
    const { code: initialCode = DEFAULT_STATE } = props;
    
    return useState<string>(initialCode);
};
