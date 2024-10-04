import { useMemo } from "react";
import { format } from "date-fns";
import { Table, Typography } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table'

import { LANGUAGES } from "../../../../shared/consts/languages";
 
export type CodeTasksTableProps = TableProps & {
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

export const CodeTasksTable = (props: CodeTasksTableProps) => {
  const { dataSource, renderAuthor, renderActions, ...rest } = props;

  const columns: ColumnsType = useMemo(() => {
    const renderDate = (value: string) => format(new Date(value), 'dd.MM.yyyy HH:mm');
    const renderLanguage = (value: string) => <Typography.Text code>{LANGUAGES_VIEW[value as LANGUAGES] ?? value}</Typography.Text>;
    
    return [
      {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
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
        title: '',
        dataIndex: 'id',
        align: 'right',
        key: 'action',
        render: renderActions,
        responsive: ['md'],
      },
    ];
  }, [renderActions, renderAuthor]);

  return (
      <Table
        dataSource={dataSource}
        columns={columns}
        {...rest}
      />
  )
}