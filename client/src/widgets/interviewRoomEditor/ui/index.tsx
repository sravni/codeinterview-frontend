import { useCallback, useEffect, useState } from 'react';
import CodeMirror, { Extension, ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { useActions, useEditor } from '../../../features/interviewRoomProvider';
import { LANGUAGES } from '../../../shared/consts/languages';

import styles from './styles.module.css';

export type InterviewRoomEditorProps = ReactCodeMirrorProps & {
    language: LANGUAGES;
}

const convertLanguageToExtensions = async (language: LANGUAGES): Promise<Extension[]> => {
    switch (language) {
        case LANGUAGES.JAVASCRIPT: {
            const { javascript } = await import('@codemirror/lang-javascript');
            return [javascript()];
        }
        case LANGUAGES.TYPESCRIPT: {
            const { javascript } = await import('@codemirror/lang-javascript');
            return [javascript({ typescript: true })];
        }
        case LANGUAGES.GO: {
            const { go } = await import('@codemirror/lang-go');
            return [go()];
        }
        case LANGUAGES.CSHARP: {
            const { csharp } = await import('@replit/codemirror-lang-csharp');
            return [csharp()];
        }
        case LANGUAGES.PYTHON: {
            const { python } = await import('@codemirror/lang-python');
            return [python()];
        }
        default:
            const unknownLanguage: never = language;
            throw new Error(`Неизвестное язык программирования - ${unknownLanguage}`);
    }
};

export const InterviewRoomEditor = (props: InterviewRoomEditorProps) => { 
    const { language, ...rest } = props;
    const [extensions, setExtensions] = useState<Extension[]>([]);

    const value = useEditor(); 
    const actions = useActions();
    const handleOnChange = useCallback((value: string) => actions.setEditorValue(value), [actions]);

    useEffect(() => { 
        (async () => { 
            const languagesExtensions = await convertLanguageToExtensions(language);
            setExtensions((state) => state.concat(languagesExtensions));
        })();
    }, [language]);

    if (extensions.length === 0)
        return null;
    
    return (
        <CodeMirror
            className={styles.editor}
            value={value}
            height='100%'
            theme={vscodeDark}
            extensions={extensions}
            onChange={handleOnChange}
            {...rest}
        />
    );
}