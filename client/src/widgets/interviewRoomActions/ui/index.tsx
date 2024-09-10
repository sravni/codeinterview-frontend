import { useCallback } from "react";
import { Button, Divider } from "antd";
import { CloseInterviewButton } from "../../../features/closeInterviewButton";
import { useActions, useCodeExecuting, useEditor } from "../../../features/interviewRoomProvider";
import { CreateInterviewRatings } from "../../../features/createInterviewRatings";
import { SelectCodeTask } from "../../selectCodeTask";
import { CodeTaskModel } from "../../../entities/codeTask";
import { CaretRightOutlined, ClearOutlined } from "@ant-design/icons";
import { AdminSection } from "../../../features/adminSection";
import { InterviewPublicModel } from "../../../entities/interview";
import { STATUSES } from "../../../entities/interview/consts";
import { OpenInterviewButton } from "../../../features/openInterviewButton";

export type InterviewRoomActionsProps = {
    interview: InterviewPublicModel;
};

export const InterviewRoomActions = (props: InterviewRoomActionsProps) => { 
    const { interview } = props;
    const { id, status, language } = interview;
    const editorValue = useEditor();
    const actions = useActions();
    const isCodeExecuting = useCodeExecuting();

    const handleCloseInterviewSuccess = useCallback(() => { actions.closeRoom() }, [actions]);
    const handleSelectCodeTaskSuccess = useCallback((codeTask: CodeTaskModel) => { actions.setEditorValue(codeTask.code) }, [actions]);
    const handleExecuteClick = useCallback(() => { actions.executeCode(editorValue, language) }, [actions, editorValue, language]);
    const handleClearTerminalClick = useCallback(() => { actions.clearTerminal(); }, [actions]);
    
    return (
        <>
            <Button onClick={handleExecuteClick}  icon={<CaretRightOutlined/>} disabled={isCodeExecuting} loading={isCodeExecuting}>Выполнить</Button>
            <Divider type="vertical" />
            <Button onClick={handleClearTerminalClick} icon={<ClearOutlined />} disabled={isCodeExecuting}>Очистить лог</Button>
            <AdminSection>
                <Divider type="vertical" />
                <SelectCodeTask language={language} onSuccess={handleSelectCodeTaskSuccess}/>
                <Divider type="vertical" />
                {
                    status === STATUSES.ACTIVE
                        ? <CloseInterviewButton id={id} onSuccess={handleCloseInterviewSuccess} />
                        : <OpenInterviewButton id={id} />
                }                
                <Divider type="vertical" />
                <CreateInterviewRatings id={id} />
            </AdminSection>
        </>
    )
}