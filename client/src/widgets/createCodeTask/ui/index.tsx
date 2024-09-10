import React, { useState, useCallback } from "react";
import { Button, ButtonProps, Drawer } from "antd"

const CreateCodeTaskForm = React.lazy(() => import("../../../features/createCodeTaskForm"));

export type CreateCodeTaskProps = Omit<ButtonProps, 'children'> & {
    onSuccess?: () => void;
};

export const CreateCodeTask = (props: CreateCodeTaskProps) => {
    const { onClick, onSuccess, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => { onClick?.(event); setIsOpen(true) }, [onClick]);
    const handleDrawerOnClose = useCallback(() => { setIsOpen(false) }, []);
    const handleCreateCodeTaskSuccess = useCallback(() => { onSuccess?.();  setIsOpen(false); }, [onSuccess]);
    const handleCreateCodeTaskCancel = useCallback(() => { setIsOpen(false); },[])

    return (
        <>
            <Button type="primary" {...rest} onClick={handleButtonClick}>Добавить задачу</Button>
            <Drawer
                title="Добавление задачи"
                placement="right"
                width={450}
                open={isOpen}
                onClose={handleDrawerOnClose}
            >
                <React.Suspense fallback={<>...</>}>
                    <CreateCodeTaskForm
                        onSuccess={handleCreateCodeTaskSuccess}
                        onCancel={handleCreateCodeTaskCancel}
                    />
                </React.Suspense>
            </Drawer>
        </>
    )
}