import { useCallback, useEffect, useState } from "react";
import { Card, Col, Radio, Row, RowProps } from "antd";

import { CodeTaskModel } from "../../../entities/codeTask";

import styles from './styles.module.css';

export type SelectCodeTaskListProps = Omit<RowProps, 'onChange'> & {
    data: CodeTaskModel[];
    onChange: (codeTask: CodeTaskModel | null) => void;
}
export const SelectCodeTaskList = (props: SelectCodeTaskListProps) => { 
    const { data, onChange, ...rest } = props;
    const [selectedCodeTask, setSelectedCodeTask] = useState<CodeTaskModel | null>(null);
    const handleCardClick = useCallback((codeTask: CodeTaskModel) => () => {
        if (selectedCodeTask?.id === codeTask.id) {
            setSelectedCodeTask(null);
            return;
        }
        
        setSelectedCodeTask(codeTask);
    }, [selectedCodeTask]);

    useEffect(() => { 
        onChange(selectedCodeTask);
    }, [onChange, selectedCodeTask])

    return (
        <Row gutter={[20, 20]} {...rest}>
            {
                data.length === 0 
                    ? <Col span={24}>Ничего не найдено</Col>
                    : null
            }
            {
                data.map((codeTask, index) => 
                    <Col span={8} key={index}>
                        <Card               
                            title={codeTask.title}
                            size="small"
                            hoverable={true}
                            className={styles.card}     
                            onClick={handleCardClick(codeTask)}
                            extra={<Radio checked={selectedCodeTask ? codeTask.id === selectedCodeTask.id : false} />}
                        >
                            <div className={styles.code}>{codeTask.code}</div>
                        </Card>
                    </Col>
                )
            }
        </Row>
    )
}