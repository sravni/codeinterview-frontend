import { useCallback, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { InterviewApi } from "../../../entities/interview";
import { RemoveInterviewView, RemoveInterviewViewProps } from "./view";
import { notification } from "antd";

export type RemoveInterviewControllerProps = RemoveInterviewViewProps & {
    interviewId: string;
    onSuccess?: () => void
};

export const RemoveInterviewController = (props: RemoveInterviewControllerProps) => {
    const { onSuccess, onClick, interviewId, ...rest } = props;
    const {
        isPending,
        mutate: removeInterview,
        error
    } = useMutation({
        mutationFn: InterviewApi.removeInterview.bind(InterviewApi),
        onSuccess,
    });

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка удаления интервью с id ='${interviewId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error, interviewId])
    
    const handleClick = useCallback((event: any) => { 
        onClick?.(event);
        removeInterview(interviewId);
    }, [interviewId, onClick, removeInterview]);
    
    return <RemoveInterviewView {...rest} loading={isPending} onClick={handleClick}/>
}