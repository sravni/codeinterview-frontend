import { useCallback } from "react";
import { Alert, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UpdateInterviewFormView, UpdateInterviewFormViewProps } from "./view";
import { NetworkError } from "../../../shared/lib/errors/network";
import { InterviewApi, InterviewModel, generateInterviewDetailsRequestKey } from "../../../entities/interview";
import type { UpdateInterviewParams } from "../../../entities/interview";

export type UpdateInterviewFormControllerProps = Omit<UpdateInterviewFormViewProps, "onSubmit" | "children" | "isPending" | "isSuccess"| "defaultValues"> & {
  interviewId: string;
  onSuccess?: () => void;
};

export const UpdateInterviewFormController = (props: UpdateInterviewFormControllerProps) => {
  const { onSuccess, interviewId, ...rest } = props;

  const queryClient = useQueryClient();
  const handleUpdateInterviewSuccess = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: generateInterviewDetailsRequestKey(interviewId)
    });
    onSuccess?.();
  }, [interviewId, onSuccess, queryClient]);
  
  const {
    isPending,
    isSuccess,
    error,
    mutate: updateInterview,
  } = useMutation<InterviewModel,Error,UpdateInterviewParams>({
    mutationFn: (data) => InterviewApi.updateInterview(interviewId, data),
    onSuccess: handleUpdateInterviewSuccess,
  });
  const { data, isLoading } = useQuery({
    queryKey: generateInterviewDetailsRequestKey(interviewId),
    queryFn: () => InterviewApi.getInterview(interviewId)
  })

  const handleOnSubmit: UpdateInterviewFormViewProps['onSubmit'] = useCallback((data) => { updateInterview(data); }, [updateInterview]);

  if (!data || isLoading)
    return <Spin />
  
  return (
      <>
        <UpdateInterviewFormView
          {...rest}
          defaultValues={data}
          onSubmit={handleOnSubmit}
          isPending={isPending}
          isSuccess={isSuccess}>
        {
          error instanceof NetworkError
            ? (
                <Alert
                  message="Сетевая ошибка. Смотри сетевые запросы для подробной информации"
                  type="warning"
                />
            )
            : null
        }
        </UpdateInterviewFormView>
      </>    
  );
};
