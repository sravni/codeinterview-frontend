import React, { useState, useCallback } from "react";
import { Button, ButtonProps, Divider, Input, Modal, Popover } from "antd"
import { FileDoneOutlined } from "@ant-design/icons";

import type { SelectCodeTaskListProps } from "../../../features/selectCodeTaskList";
import { CodeTaskModel } from "../../../entities/codeTask";
import styles from "./styles.module.css";

const SelectCodeTaskList = React.lazy(() => import("../../../features/selectCodeTaskList"));

export type SelectCodeTaskProps = Omit<ButtonProps, 'children' | 'onChange'> & Pick<SelectCodeTaskListProps, 'language'> & {
    onSuccess: (codeTask: CodeTaskModel) => void;
}

export const SelectCodeTask = (props: SelectCodeTaskProps) => {
    const { onClick, onSuccess, language, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCodeTask, setSelectedCodeTask] = useState<CodeTaskModel | null>(null);

    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => { onClick?.(event); setIsOpen(true) }, [onClick]);
    const handleSelectCodeTaskChange = useCallback((codeTask: CodeTaskModel | null) => { setSelectedCodeTask(codeTask) }, []);
    const handleSelectCodeTaskSuccess = useCallback(() => {
        if (selectedCodeTask) onSuccess(selectedCodeTask);
        setIsOpen(false);
    }, [onSuccess, selectedCodeTask]);
    const handleSelectCodeTaskCancel = useCallback(() => { setIsOpen(false); },[])

    return (
        <>
            <Button
                type="default"
                icon={<FileDoneOutlined />}
                {...rest}
                onClick={handleButtonClick}
            >
                Выбрать задание
            </Button>
            {
                selectedCodeTask && selectedCodeTask.answer
                    ? (
                        <>
                            <Divider type="vertical" />
                            <Popover
                                content={<Input.TextArea className={styles.answer} value={selectedCodeTask.answer} autoSize={{ minRows: 2, maxRows: 10 }} />}
                                trigger="click"
                                placement="topLeft"
                            >
                                <Button>Посмотреть ответ</Button>
                            </Popover>
                        </>
                    )
                    : null
            }            
            <Modal
                title="Вопросы"
                open={isOpen}
                width={900}
                onOk={handleSelectCodeTaskSuccess}
                onCancel={handleSelectCodeTaskCancel}
                okText="Вставить"
                cancelText="Закрыть"
                okButtonProps={{ disabled: !selectedCodeTask }}
            >
                 <React.Suspense fallback={<>...</>}>
                    <SelectCodeTaskList
                        language={language}
                        onChange={handleSelectCodeTaskChange}
                    />
                </React.Suspense>
            </Modal>
        </>
    )
}