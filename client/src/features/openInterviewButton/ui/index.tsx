import { Button, ButtonProps, notification } from "antd"
import { PlayCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { STATUSES } from "../../../entities/interview/consts";
import { InterviewApi, InterviewModel, generateInterviewsCommonRequestKey } from "../../../entities/interview";

export type OpenInterviewButtonProps = {
    id: InterviewModel['id'];
    onSuccess?: () => void;
} & ButtonProps; 

export const OpenInterviewButton = (props: OpenInterviewButtonProps) => {
    const { id: interviewId, onSuccess, ...rest } = props;
    
    const queryClient = useQueryClient();
    const handleUpdateInterviewSuccess = useCallback(() => {        
        queryClient.invalidateQueries({
            queryKey: generateInterviewsCommonRequestKey(),
        });
        onSuccess?.();
    }, [onSuccess, queryClient]);
    
    const {
        isPending,
        error,
        mutate: updateInterview,
    } = useMutation<InterviewModel, Error>({
        mutationFn: () => InterviewApi.updateInterview(interviewId, { status: STATUSES.ACTIVE }),
        onSuccess: handleUpdateInterviewSuccess,
    });
    
    const handleClick = useCallback(() => updateInterview(), [updateInterview]);

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка открытия интервью`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error])

    return (
        <Button key="Open" type="primary" icon={<PlayCircleOutlined />} {...rest} loading={isPending} onClick={handleClick}>
            Открыть интервью
        </Button>
    )
}