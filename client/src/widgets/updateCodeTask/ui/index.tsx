import React, { useState, useCallback } from "react";
import { Button, ButtonProps, Drawer } from "antd"
import { FormOutlined } from "@ant-design/icons";

import type { UpdateCodeTaskFormProps } from "../../../features/updateCodeTaskForm";

const UpdateCodeTaskForm = React.lazy(() => import("../../../features/updateCodeTaskForm"));

export type UpdateCodeTaskProps = Omit<ButtonProps, 'children'> & Pick<UpdateCodeTaskFormProps, 'codeTaskId'> & {
    onSuccess?: () => void;
};

export const UpdateCodeTask = (props: UpdateCodeTaskProps) => {
    const { onClick, onSuccess, codeTaskId, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => { onClick?.(event); setIsOpen(true) }, [onClick]);
    const handleDrawerOnClose = useCallback(() => { setIsOpen(false) }, []);
    const handleUpdateCodeTaskSuccess = useCallback(() => { onSuccess?.();  setIsOpen(false); }, [onSuccess]);
    const handleUpdateCodeTaskCancel = useCallback(() => { setIsOpen(false); },[])

    return (
        <>
            <Button key="edit" type="text" icon={<FormOutlined />} title="Редактировать" onClick={handleButtonClick} {...rest} />
            <Drawer
                title="Редактирование задачи"
                placement="right"
                width={450}
                open={isOpen}
                onClose={handleDrawerOnClose}
            >
                <React.Suspense fallback={<>...</>}>
                    <UpdateCodeTaskForm
                        codeTaskId={codeTaskId}
                        onSuccess={handleUpdateCodeTaskSuccess}
                        onCancel={handleUpdateCodeTaskCancel}
                    />
                </React.Suspense>
            </Drawer>
        </>
    )
}