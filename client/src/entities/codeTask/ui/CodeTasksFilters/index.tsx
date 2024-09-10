import { useMemo } from 'react';
import classNames from 'classnames';
import { Col, Form, Row, Input, Select, Button } from 'antd'
import { FormProps } from 'antd/lib/form'
import { ClearOutlined } from '@ant-design/icons'

import { LANGUAGES } from '../../../../shared/consts/languages';
import { FIELD_NAME } from './consts';


// TODO: Заменить на i18n
const LANGUAGES_VIEW = { 
    [LANGUAGES.JAVASCRIPT]: 'JavaScript',
    [LANGUAGES.TYPESCRIPT]: 'TypeScript',
    [LANGUAGES.GO]: 'Go',
    [LANGUAGES.CSHARP]: 'C#',
}

// TODO: Заменить на i18n
export const LABELS = {
  [FIELD_NAME.TITLE]: 'Название',
  [FIELD_NAME.LANGUAGE]: 'Язык',
}


export type CodeTasksFiltersProps = Omit<FormProps, "form" | "layout" | "name" | "initialValues" | "onValuesChange" | "onChange"> & {
  filters: {
    [FIELD_NAME.TITLE]?: string;
    [FIELD_NAME.LANGUAGE]?: LANGUAGES;
  },
  onChange: (changedValues: any, values: any) => void;
  onClear: () => void
};

export const CodeTasksFilters = (props: CodeTasksFiltersProps) => {
  const { className, filters, onChange, onClear, ...rest } = props;
  const [form] = Form.useForm()

  const languagesOptions = useMemo(() => Object.entries(LANGUAGES).map(([_, value]) => ({ value, label: LANGUAGES_VIEW[value] ?? value })), []);
    
  return (    
      <Form
        form={form}
        className={classNames(className)}
        layout="vertical"
        name="basic"
         fields={[
          { name: FIELD_NAME.TITLE, value: filters[FIELD_NAME.TITLE] },
          { name: FIELD_NAME.LANGUAGE, value: filters[FIELD_NAME.LANGUAGE] },
        ]}
        onValuesChange={onChange}
        {...rest}
      >
        <Row gutter={20}>
          <Col span={4}>
            <Form.Item name={FIELD_NAME.TITLE} style={{ marginBottom: 0 }}>
              <Input placeholder={LABELS[FIELD_NAME.TITLE]} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name={FIELD_NAME.LANGUAGE} style={{ marginBottom: 0 }}>
              <Select placeholder={LABELS[FIELD_NAME.LANGUAGE]} options={languagesOptions} />
            </Form.Item>
          </Col>
          {/* <Col span={4}>
            <Form.Item name={FIELDS.MY} valuePropName="checked">
              <Checkbox>Мои интервью</Checkbox>
            </Form.Item>
          </Col> */}
          <Col span={8} className="t-right">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button title="Сбросить фильтры" onClick={onClear} icon={<ClearOutlined />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
  )
}


