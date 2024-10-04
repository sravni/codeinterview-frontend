import { useMemo } from "react";
import { format } from "date-fns";
import { Table, TableProps, TableColumnsType, Tag, Typography } from 'antd';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Link } from "react-router-dom";

import { useIsMobile } from "../../../../shared/lib/hooks/useDevice";
import { LANGUAGES } from "../../../../shared/consts/languages";
import { STATUSES } from "../../consts";
import { InterviewModel } from "../..";
 
export type InterviewsTableProps = TableProps<InterviewModel> & {
  renderRating?: (interviewId: string) => JSX.Element;
  renderActions?: (interviewId: string) => JSX.Element | JSX.Element[];
  renderAuthor?: (authorId: string) => JSX.Element;
};

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
const STATUSES_COLORS = {
  [STATUSES.ACTIVE]: '#5db438',
  [STATUSES.ARCHIVED]: '#c22d02',
}

export const InterviewsTable = (props: InterviewsTableProps) => {
  const { dataSource, renderRating, renderAuthor, renderActions, ...rest } = props;
  const isMobile = useIsMobile();

  const columns: TableColumnsType<InterviewModel> = useMemo(() => {
    const renderDate = (value: string) => format(new Date(value), 'dd.MM.yyyy HH:mm');
    const renderLanguage = (value: string) => <Typography.Text code>{LANGUAGES_VIEW[value as LANGUAGES] ?? value}</Typography.Text>;
    const renderStatus = (value: string) => {
      if (isMobile) {
        switch (value) {
          case STATUSES.ACTIVE:
            return <CheckCircleOutlined style={{ color: STATUSES_COLORS[STATUSES.ACTIVE] }} />
          case STATUSES.ARCHIVED:
            return <CloseCircleOutlined style={{ color: STATUSES_COLORS[STATUSES.ARCHIVED] }} />
        }
      }
        
      return <Tag color={STATUSES_COLORS[value as STATUSES]}>{STATUSES_VIEW[value as STATUSES] ?? value}</Tag>
    }
    const renderTitle = (value: string, interview: InterviewModel) => {
      return <Link to={`/interviews/${interview.id}`}>{value}</Link>
    }
    const renderIntervieweeName = (value: string) => {
      return <Typography.Text>{value}</Typography.Text>
    }
    
    return [
      {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
        render: renderTitle,
      },
      {
        title: 'Имя Кандидата',
        dataIndex: 'intervieweeName',
        key: 'intervieweeName',
        render: renderIntervieweeName,
      },
      {
        title: 'Автор',
        dataIndex: 'authorId',
        key: 'author',
        sorter: true,
        render: renderAuthor,
      },
      {
        title: 'Дата создания',
        dataIndex: 'created',
        key: 'created',
        render: renderDate,
        sorter: true,
        responsive: ['md'],
      },
      {
        title: 'Дата изменения',
        dataIndex: 'updated',
        key: 'updated',
        render: renderDate,
        sorter: true,
        defaultSortOrder: 'descend',
        responsive: ['xl'],
      },
      {
        title: 'Язык',
        dataIndex: 'language',
        key: 'language',
        render: renderLanguage,
        responsive: ['md'],
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: renderStatus,
      },
      {
        title: 'Оценка',
        dataIndex: 'id',
        key: 'rating',
        render: renderRating,
      },
      {
        title: '',
        dataIndex: 'id',
        align: 'right',
        key: 'action',
        render: renderActions,
        responsive: ['md'],
      },
    ];
  }, [isMobile, renderActions, renderAuthor, renderRating]);

  return (
      <Table
        dataSource={dataSource}
        columns={columns}
        {...rest}
      />
  )
}