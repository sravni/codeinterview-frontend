import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Select, Row, Col, Button } from "antd";
import { FormProps } from "antd/lib/form";
import * as Yup from "yup";
import { FormItem } from "react-hook-form-antd";
import { yupResolver } from "@hookform/resolvers/yup";

import { LANGUAGES } from "../../../shared/consts/languages";

import { validationSchema } from "./validationSchema";
import { FIELD_NAME } from "./consts";
import styles from "./styles.module.css";

// TODO: Заменить на i18n
const LANGUAGES_VIEW = {
    [LANGUAGES.JAVASCRIPT]: 'JavaScript',
    [LANGUAGES.TYPESCRIPT]: 'TypeScript',
    [LANGUAGES.GO]: 'Go',
    [LANGUAGES.CSHARP]: 'C#',
    [LANGUAGES.PYTHON]: 'Python',
}

type Values = Yup.InferType<typeof validationSchema>

export type CreateCodeTaskFormViewProps = FormProps & {
    onSubmit: (values: Values) => void;
    isPending?: boolean;
    isSuccess?: boolean;
    onCancel?: () => void;
}

export const CreateCodeTaskFormView = (props: CreateCodeTaskFormViewProps) => {
    const { onSubmit, onCancel, isPending, isSuccess, children, ...rest } = props;
    const { control, handleSubmit, reset } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (isSuccess) reset()
    }, [isSuccess, reset]);
    
    const handleCancel = useCallback(() => {
        reset();
        onCancel?.();
    },[onCancel, reset])
    const languagesOptions = useMemo(() => Object.entries(LANGUAGES).map(([_, value]) => ({ value, label: LANGUAGES_VIEW[value] ?? value })), []);
    
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
                        name={FIELD_NAME.TITLE}
                        label="Название"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                        required
                        control={control}
                        name={FIELD_NAME.LANGUAGE}
                        label="Язык"
                        labelCol={{ span: 24 }}
                    >
                        <Select options={languagesOptions} />
                        </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                        required
                        control={control}
                        name={FIELD_NAME.CODE}
                        label="Код"
                        labelCol={{ span: 24 }}
                    >
                        <Input.TextArea className={styles.code} />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                        control={control}
                        name={FIELD_NAME.ANSWER}
                        label="Ответ"
                        labelCol={{ span: 24 }}
                    >
                        <Input.TextArea />
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={[16, 0]}>
                <Col span={12}>
                    <Button block type="primary" htmlType="submit" loading={isPending}>Создать</Button>
                </Col>
                <Col span={12}>
                    <Button block type="default" htmlType="button" onClick={handleCancel}>Отмена</Button>
                </Col>
            </Row>
            {
                children && typeof children !== 'function'
                    ? <div className={styles.children}>{children}</div>
                    : null
            }
        </Form>
    )
}

