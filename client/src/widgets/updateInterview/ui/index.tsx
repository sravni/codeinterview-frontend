import React, { useState, useCallback } from "react";
import { Button, ButtonProps, Drawer } from "antd"
import { FormOutlined } from "@ant-design/icons";

import type { UpdateInterviewFormProps } from "../../../features/updateInterviewForm";

const UpdateInterviewForm = React.lazy(() => import("../../../features/updateInterviewForm"));

export type UpdateInterviewProps = Omit<ButtonProps, 'children'> & Pick<UpdateInterviewFormProps, 'interviewId'> & {
    onSuccess?: () => void;
};

export const UpdateInterview = (props: UpdateInterviewProps) => {
    const { onClick, onSuccess, interviewId, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => { onClick?.(event); setIsOpen(true) }, [onClick]);
    const handleDrawerOnClose = useCallback(() => { setIsOpen(false) }, []);
    const handleUpdateInterviewSuccess = useCallback(() => { onSuccess?.();  setIsOpen(false); }, [onSuccess]);
    const handleUpdateInterviewCancel = useCallback(() => { setIsOpen(false); },[])

    return (
        <>
            <Button key="edit" type="text" icon={<FormOutlined />} title="Редактировать" onClick={handleButtonClick} {...rest} />
            <Drawer
                title="Редактирование интервью"
                placement="right"
                width={450}
                open={isOpen}
                onClose={handleDrawerOnClose}
            >
                <React.Suspense fallback={<>...</>}>
                    <UpdateInterviewForm
                        interviewId={interviewId}
                        onSuccess={handleUpdateInterviewSuccess}
                        onCancel={handleUpdateInterviewCancel}
                    />
                </React.Suspense>
            </Drawer>
        </>
    )
}