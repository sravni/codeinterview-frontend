import { Form, Input, Row, Col, Button } from "antd";
import * as Yup from "yup";
import { FormProps } from "antd/lib/form";
import { FormItem } from "react-hook-form-antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FIELD_NAME } from "./consts";
import { validationSchema } from "./validationSchema";

export type Values = Yup.InferType<typeof validationSchema>

export type InterviewRoomLoginFormProps = FormProps & {
    onSubmit: (values: Values) => void;
};

export const InterviewRoomLoginForm = (props: InterviewRoomLoginFormProps) => { 
    const { onSubmit, ...rest } = props;
    const { control, handleSubmit } = useForm({        
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(validationSchema),
    });
    
    return (
         <Form
            {...rest}
            onFinish={handleSubmit(onSubmit)}
        >
            <Row>
                <Col span={24}>
                    <FormItem
                        required
                        control={control}
                        name={FIELD_NAME.DISPLAY_NAME}
                        label="Ваше Имя"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </FormItem>
                </Col>
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <Button block type="primary" htmlType="submit">Войти</Button>
                    </Col>                   
                </Row>
            </Row>
        </Form>
    )
}