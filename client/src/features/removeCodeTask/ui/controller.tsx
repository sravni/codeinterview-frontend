import { useCallback, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { CodeTaskApi } from "../../../entities/codeTask";
import { RemoveCodeTaskView, RemoveCodeTaskViewProps } from "./view";
import { notification } from "antd";

export type RemoveCodeTaskControllerProps = RemoveCodeTaskViewProps & {
    codeTaskId: string;
    onSuccess?: () => void
};

export const RemoveCodeTaskController = (props: RemoveCodeTaskControllerProps) => {
    const { onSuccess, onClick, codeTaskId, ...rest } = props;
    const {
        isPending,
        mutate: removeCodeTask,
        error
    } = useMutation({
        mutationFn: CodeTaskApi.removeCodeTask.bind(CodeTaskApi),
        onSuccess,
    });

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка удаления вопроса с id ='${codeTaskId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error, codeTaskId])
    
    const handleClick = useCallback((event: any) => { 
        onClick?.(event);
        removeCodeTask(codeTaskId);
    }, [codeTaskId, onClick, removeCodeTask]);
    
    return <RemoveCodeTaskView {...rest} loading={isPending} onClick={handleClick}/>
}