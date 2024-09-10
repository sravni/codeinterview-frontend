import { useCallback } from "react";
import { Alert } from "antd";
import { useMutation } from "@tanstack/react-query";

import { CreateCodeTaskFormView, CreateCodeTaskFormViewProps } from "./view";
import { NetworkError } from "../../../shared/lib/errors/network";
import { CodeTaskApi } from "../../../entities/codeTask";

export type CreateCodeTaskFormControllerProps = Omit<CreateCodeTaskFormViewProps, "onSubmit" | "children" | "isPending" | "isSuccess"> & {
  onSuccess?: () => void
};

export const CreateCodeTaskFormController = (props: CreateCodeTaskFormControllerProps) => {
  const { onSuccess, ...rest } = props;
  const {
    isPending,
    isSuccess,
    error,
    mutate: createCodeTask,
  } = useMutation({
    mutationFn: CodeTaskApi.createCodeTask.bind(CodeTaskApi),
    onSuccess,
  });

  const handleOnSubmit: CreateCodeTaskFormViewProps['onSubmit'] = useCallback((data) => { createCodeTask(data); }, [createCodeTask]);

  return (
      <>
        <CreateCodeTaskFormView
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
        </CreateCodeTaskFormView>
      </>    
  );
};
