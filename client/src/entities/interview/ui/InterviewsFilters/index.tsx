import { useMemo } from 'react';
import classNames from 'classnames';
import { Col, Form, Row, Input, Select, Button } from 'antd'
import { FormProps } from 'antd/lib/form'
import { ClearOutlined } from '@ant-design/icons'
import { LANGUAGES } from '../../../../shared/consts/languages';
import { FIELD_NAME } from './consts';
import { STATUSES } from '../../consts';


// TODO: Заменить на i18n
const LANGUAGES_VIEW = { 
  [LANGUAGES.JAVASCRIPT]: 'JavaScript',
  [LANGUAGES.TYPESCRIPT]: 'TypeScript',
  [LANGUAGES.GO]: 'Go',
  [LANGUAGES.CSHARP]: 'C#',
  [LANGUAGES.PYTHON]: 'Python',
}
// TODO: Заменить на i18n
const STATUSES_VIEW = {
  [STATUSES.ACTIVE]: 'Активный',
  [STATUSES.ARCHIVED]: 'Архивный',
}

// TODO: Заменить на i18n
export const LABELS = {
  [FIELD_NAME.TITLE]: 'Название',
  [FIELD_NAME.INTERVIEWEE_NAME]: 'Имя кандидата',
  [FIELD_NAME.LANGUAGE]: 'Язык',
  [FIELD_NAME.STATUS]: 'Статус',
}


export type InterviewsFiltersProps = Omit<FormProps, "form" | "layout" | "name" | "initialValues" | "onValuesChange" | "onChange"> & {
  filters: {
    [FIELD_NAME.TITLE]?: string;
    [FIELD_NAME.INTERVIEWEE_NAME]?: string;
    [FIELD_NAME.LANGUAGE]?: LANGUAGES;
    [FIELD_NAME.STATUS]?: STATUSES;
  },
  onChange: (changedValues: any, values: any) => void;
  onClear: () => void
};

export const InterviewsFilters = (props: InterviewsFiltersProps) => {
  const { className, filters, onChange, onClear, ...rest } = props;
  const [form] = Form.useForm()

  const languagesOptions = useMemo(() => Object.entries(LANGUAGES).map(([_, value]) => ({ value, label: LANGUAGES_VIEW[value] ?? value })), []);
  const statusesOptions = useMemo(() => Object.entries(STATUSES).map(([_, value]) => ({ value, label: STATUSES_VIEW[value] ?? value })), []);
    
  return (    
      <Form
        form={form}
        className={classNames(className)}
        layout="vertical"
        name="basic"
        fields={[
          { name: FIELD_NAME.TITLE, value: filters[FIELD_NAME.TITLE] },
          { name: FIELD_NAME.INTERVIEWEE_NAME, value: filters[FIELD_NAME.INTERVIEWEE_NAME] },
          { name: FIELD_NAME.LANGUAGE, value: filters[FIELD_NAME.LANGUAGE] },
          { name: FIELD_NAME.STATUS, value: filters[FIELD_NAME.STATUS] },
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
            <Form.Item name={FIELD_NAME.INTERVIEWEE_NAME} style={{ marginBottom: 0 }}>
              <Input placeholder={LABELS[FIELD_NAME.INTERVIEWEE_NAME]} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name={FIELD_NAME.LANGUAGE} style={{ marginBottom: 0 }}>
              <Select placeholder={LABELS[FIELD_NAME.LANGUAGE]} options={languagesOptions} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name={FIELD_NAME.STATUS} style={{ marginBottom: 0 }}>
              <Select placeholder={LABELS[FIELD_NAME.STATUS]} options={statusesOptions} />
            </Form.Item>
          </Col>          
          <Col span={8} className="t-right">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button title="Сбросить фильтры" onClick={onClear} icon={<ClearOutlined />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
  )
}


