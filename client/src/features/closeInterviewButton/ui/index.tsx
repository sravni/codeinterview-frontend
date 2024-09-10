import { Button, ButtonProps, notification } from "antd"
import { CloseSquareOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { STATUSES } from "../../../entities/interview/consts";
import { InterviewApi, InterviewModel, generateInterviewsCommonRequestKey } from "../../../entities/interview";

export type CloseInterviewButtonProps = {
    id: InterviewModel['id'];
    onSuccess?: () => void;
} & ButtonProps; 

export const CloseInterviewButton = (props: CloseInterviewButtonProps) => {
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
        mutationFn: () => InterviewApi.updateInterview(interviewId, { status: STATUSES.ARCHIVED }),
        onSuccess: handleUpdateInterviewSuccess,
    });
    
    const handleClick = useCallback(() => updateInterview(), [updateInterview]);

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка закрытия интервью`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error])

    return (
        <Button key="close" type="primary" danger icon={<CloseSquareOutlined />} {...rest} loading={isPending} onClick={handleClick}>
            Закрыть интервью
        </Button>
    )
}