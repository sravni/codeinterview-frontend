import { useCallback } from "react";
import { Button, Popconfirm, Spin } from "antd"
import { ButtonProps } from "antd/lib/button"
import { DeleteOutlined } from "@ant-design/icons"

export type RemoveInterviewViewProps = ButtonProps;

export const RemoveInterviewView = (props: RemoveInterviewViewProps) => {
    const { onClick, loading, ...rest } = props;
    const handleConfirm = useCallback((event: any) => { 
        onClick?.(event);
    }, [onClick]);
    
    return (
        <Popconfirm
            placement="topLeft"
            title="Вы уверены что хотите удалить?"
            okText="Да"
            cancelText="Нет"
            onConfirm={handleConfirm}
        >
          <Button key="remove" type="text" icon={ loading ? <Spin/>: <DeleteOutlined />} title="Удалить" {...rest}/>
        </Popconfirm>
    )
    
    
}