import { useCallback } from "react";
import { Alert } from "antd";
import { useMutation } from "@tanstack/react-query";

import { NetworkError } from "../../../shared/lib/errors/network";
import { InterviewApi } from "../../../entities/interview";

import { CreateInterviewFormView, CreateInterviewFormViewProps } from "./view";

export type CreateInterviewFormControllerProps = Omit<CreateInterviewFormViewProps, "onSubmit" | "children" | "isPending" | "isSuccess"> & {
  onSuccess?: () => void
};

export const CreateInterviewFormController = (props: CreateInterviewFormControllerProps) => {
  const { onSuccess, ...rest } = props;
  const {
    isPending,
    isSuccess,
    error,
    mutate: createInterview,
  } = useMutation({
    mutationFn: InterviewApi.createInterview.bind(InterviewApi),
    onSuccess,
  });

  const handleOnSubmit: CreateInterviewFormViewProps['onSubmit'] = useCallback((data) => { createInterview(data); }, [createInterview]);

  return (
      <>
        <CreateInterviewFormView
          {...rest}
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
        </CreateInterviewFormView>
      </>    
  );
};
