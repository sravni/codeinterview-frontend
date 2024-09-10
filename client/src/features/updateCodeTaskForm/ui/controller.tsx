import { useCallback } from "react";
import { Alert, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UpdateCodeTaskFormView, UpdateCodeTaskFormViewProps } from "./view";
import { NetworkError } from "../../../shared/lib/errors/network";
import { CodeTaskApi, CodeTaskModel, generateCodeTaskDetailsRequestKey } from "../../../entities/codeTask";
import type { UpdateCodeTaskParams } from "../../../entities/codeTask";

export type UpdateCodeTaskFormControllerProps = Omit<UpdateCodeTaskFormViewProps, "onSubmit" | "children" | "isPending" | "isSuccess"| "defaultValues"> & {
  codeTaskId: string;
  onSuccess?: () => void;
};

export const UpdateCodeTaskFormController = (props: UpdateCodeTaskFormControllerProps) => {
  const { onSuccess, codeTaskId, ...rest } = props;

  const queryClient = useQueryClient();
  const handleUpdateCodeTaskSuccess = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: generateCodeTaskDetailsRequestKey(codeTaskId)
    });
    onSuccess?.();
  }, [codeTaskId, onSuccess, queryClient]);
  
  const {
    isPending,
    isSuccess,
    error,
    mutate: updateCodeTask,
  } = useMutation<CodeTaskModel,Error,UpdateCodeTaskParams>({    
    mutationFn: (data) => CodeTaskApi.updateCodeTask(codeTaskId, data),
    onSuccess: handleUpdateCodeTaskSuccess,
  });
  const { data, isLoading } = useQuery({
    queryKey: generateCodeTaskDetailsRequestKey(codeTaskId),
    queryFn: () => CodeTaskApi.getCodeTask(codeTaskId)
  })

  const handleOnSubmit: UpdateCodeTaskFormViewProps['onSubmit'] = useCallback((data) => { updateCodeTask(data); }, [updateCodeTask]);

  if (!data || isLoading)
    return <Spin />
  
  return (
      <>
        <UpdateCodeTaskFormView
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
        </UpdateCodeTaskFormView>
      </>    
  );
};
