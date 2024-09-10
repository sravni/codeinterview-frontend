import React, { useState, useCallback } from "react";
import { Button, ButtonProps, Drawer } from "antd"

const CreateInterviewForm = React.lazy(() => import("../../../features/createInterviewForm"));

export type CreateInterviewProps = Omit<ButtonProps, 'children'> & {
    onSuccess?: () => void;
};

export const CreateInterview = (props: CreateInterviewProps) => {
    const { onClick, onSuccess, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => { onClick?.(event); setIsOpen(true) }, [onClick]);
    const handleDrawerOnClose = useCallback(() => { setIsOpen(false) }, []);
    const handleCreateInterviewSuccess = useCallback(() => { onSuccess?.();  setIsOpen(false); }, [onSuccess]);
    const handleCreateInterviewCancel = useCallback(() => { setIsOpen(false); },[])

    return (
        <>
            <Button type="primary" {...rest} onClick={handleButtonClick}>Добавить интервью</Button>
            <Drawer
                title="Добавление интервью"
                placement="right"
                width={450}
                open={isOpen}
                onClose={handleDrawerOnClose}
            >
                <React.Suspense fallback={<>...</>}>
                    <CreateInterviewForm
                        onSuccess={handleCreateInterviewSuccess}
                        onCancel={handleCreateInterviewCancel}
                    />
                </React.Suspense>
            </Drawer>
        </>
    )
}