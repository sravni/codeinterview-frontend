import { useCallback, useEffect, useMemo, useState } from 'react';
import { notification, Card } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounceCallback } from 'usehooks-ts'
import { TablePaginationConfig } from 'antd/lib/table';
import { useSearchParams, createSearchParams } from 'react-router-dom';



import { UserName } from '../../../features/userName';
import { RemoveCodeTask } from '../../../features/removeCodeTask';
import { UpdateCodeTask } from '../../updateCodeTask';

import { convertFromAntd } from '../../../shared/lib/convertSorting';
import { Paginated, PaginationParams } from '../../../shared/interfaces/paginated';

import { clearObject } from '../../../shared/lib/clearObject';
import { CodeTasksTable, CodeTasksTableProps, generateCodeTasksCommonRequestKey } from '../../../entities/codeTask';
import { CodeTaskApi, CodeTaskModel, CodeTasksFilters, CodeTasksFiltersProps } from '../../../entities/codeTask';

import styles from './styles.module.css';


export type CodeTasksTableWithFiltersProps = Omit<CodeTasksTableProps, "dataSource"> & {};

const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;
const DEFAULT_DATA: Paginated<CodeTaskModel> = { items: [], total: 0 };
const getFiltersFromQuery = (query: URLSearchParams): CodeTasksFiltersProps['filters'] => {
    const title = query.get('title');
    const language = query.get('language');
    
    return clearObject({ title, language })
};
const getPaginationFromQuery = (query: URLSearchParams): Required<PaginationParams> => { 
    const limit = query.get('limit') || DEFAULT_LIMIT;
    const skip = query.get('skip') || DEFAULT_SKIP;

    return {
        limit: Number(limit),
        skip: Number(skip),
    };
}

export const CodeTasksTableWithFilters = (props: CodeTasksTableWithFiltersProps) => {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams({});
    const [filters, setFilters] = useState<CodeTasksFiltersProps['filters']>(getFiltersFromQuery(searchParams));
    const [pagination, setPagination] = useState(getPaginationFromQuery(searchParams))
    const [sorting, setSorting] = useState<Record<'order', string | string[] | undefined>>({ order: undefined });
    
    const { isLoading, data = DEFAULT_DATA, error } = useQuery({
        queryKey: [...generateCodeTasksCommonRequestKey(), filters, pagination, sorting],
        queryFn: () => CodeTaskApi.getCodeTasks(clearObject({ ...(filters as any), ...(pagination as any), ...sorting }))
    });

    const initialPaginationParams: TablePaginationConfig = useMemo(() => {
        const { limit, skip } = pagination;

        return {
            pageSize: limit,
            showQuickJumper: true,
            hideOnSinglePage: true,
            total: data.total,
            defaultCurrent: Math.floor(skip / limit) + 1,
        }
    }, [data.total, pagination]);
    
    const handleTableChange = useCallback((pagination: TablePaginationConfig, _: any, sorting: any) => { 
        const { current = 1, pageSize = DEFAULT_LIMIT } = pagination;
        setPagination((state) => ({ ...state, skip: (current - 1) * pageSize, limit: pageSize }));
        setSorting({ order: convertFromAntd(sorting) });
    }, []);

    const handleFiltersChange = useDebounceCallback((values: CodeTasksFiltersProps['filters']) => {
        setPagination({ skip: DEFAULT_SKIP, limit: DEFAULT_LIMIT });
        setFilters((state) => ({ ...state, ...values }));
    }, 500);

    const handleFiltersClear = useCallback(() => { 
        setFilters({});
    }, [])
    const handlerRemoveCodeTaskSuccess = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: generateCodeTasksCommonRequestKey(),
        })
    }, [queryClient]);
    const handleUpdateCodeTaskSuccess = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: generateCodeTasksCommonRequestKey(),
        })
    }, [queryClient]);
    const handleRenderAuthor = useCallback((authorId: string) => <UserName userId={authorId} />, []);
    const handleRenderActions = useCallback((codeTaskId: string) => ([
        <UpdateCodeTask codeTaskId={codeTaskId} onSuccess={handleUpdateCodeTaskSuccess}/>,
        <RemoveCodeTask key="remove" codeTaskId={codeTaskId} onSuccess={handlerRemoveCodeTaskSuccess} />
    ]), [handleUpdateCodeTaskSuccess, handlerRemoveCodeTaskSuccess]);

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка запроса`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error])

    useEffect(() => { 
        setSearchParams(
            createSearchParams(
                clearObject({ ...searchParams, ...pagination, ...filters, ...sorting })
            )
        )
    }, [filters, pagination, searchParams, setSearchParams, sorting]);
    
    return (
        <>
            <Card className={styles.filters}>
                <CodeTasksFilters
                    filters={filters}
                    onChange={handleFiltersChange}
                    onClear={handleFiltersClear}
                /> 
            </Card>
            <CodeTasksTable
                {...props}
                loading={isLoading}
                dataSource={data.items}
                pagination={initialPaginationParams}
                onChange={handleTableChange}
                renderAuthor={handleRenderAuthor}
                renderActions={handleRenderActions}
            />
        </>
    )
}
export default CodeTasksTableWithFilters;