import { useCallback, useEffect, useMemo, useState } from 'react';
import { notification, Card, Button } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounceCallback } from 'usehooks-ts'
import { TablePaginationConfig } from 'antd/lib/table';
import { CodeOutlined } from '@ant-design/icons';
import { Link, useSearchParams, createSearchParams } from 'react-router-dom';


import { InterviewApi, InterviewModel, generateInterviewsCommonRequestKey, InterviewsFilters, InterviewsFiltersProps, InterviewsTable, InterviewsTableProps  } from '../../../entities/interview';

import { UserName } from '../../../features/userName';
import { RemoveInterview } from '../../../features/removeInterview';
import { UpdateInterview } from '../../updateInterview';

import { convertFromAntd } from '../../../shared/lib/convertSorting';
import { Paginated, PaginationParams } from '../../../shared/interfaces/paginated';
import { clearObject } from '../../../shared/lib/clearObject';

import { InterviewRatingAverageWithUsers } from '../../../widgets/interviewRatingAverageWithUsers/ui';

import styles from './styles.module.css';

export type InterviewsTableWithFiltersProps = Omit<InterviewsTableProps, "dataSource"> & {};

const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;
const DEFAULT_DATA: Paginated<InterviewModel> = { items: [], total: 0 };
const getFiltersFromQuery = (query: URLSearchParams): InterviewsFiltersProps['filters'] => {
    const title = query.get('title');
    const intervieweeName = query.get('intervieweeName');
    const language = query.get('language');
    const status = query.get('status');
    
    return clearObject({ title, intervieweeName, language, status })
};
const getPaginationFromQuery = (query: URLSearchParams): Required<PaginationParams> => { 
    const limit = query.get('limit') || DEFAULT_LIMIT;
    const skip = query.get('skip') || DEFAULT_SKIP;

    return {
        limit: Number(limit),
        skip: Number(skip),
    };
}

export const InterviewsTableWithFilters = (props: InterviewsTableWithFiltersProps) => {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams({});
    const [filters, setFilters] = useState<InterviewsFiltersProps['filters']>(getFiltersFromQuery(searchParams));
    const [pagination, setPagination] = useState(getPaginationFromQuery(searchParams))
    const [sorting, setSorting] = useState<Record<'order', string | string[] | undefined>>({ order: undefined });
    
    const { isLoading, data = DEFAULT_DATA, error } = useQuery({
        queryKey: [...generateInterviewsCommonRequestKey(), filters, pagination, sorting],
        queryFn: () => InterviewApi.getInterviews(clearObject({ ...(filters as any), ...(pagination as any), ...sorting }))
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

    const handleFiltersChange = useDebounceCallback((values: InterviewsFiltersProps['filters']) => {
        setPagination({ skip: DEFAULT_SKIP, limit: DEFAULT_LIMIT });
        setFilters((state) => ({ ...state, ...values }));
    }, 500);

    const handleFiltersClear = useCallback(() => {
        setFilters({});
    }, []);
    const handlerRemoveInterviewSuccess = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: generateInterviewsCommonRequestKey(),
        })
    }, [queryClient]);
    const handleUpdateInterviewSuccess = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: generateInterviewsCommonRequestKey(),
        })
    }, [queryClient]);
    const handleRenderAuthor = useCallback((authorId: string) => <UserName userId={authorId} />, []);
    const handleRenderRating = useCallback((interviewId: string) => <InterviewRatingAverageWithUsers interviewId={interviewId} />, []);
    const handleRenderActions = useCallback((interviewId: string) => ([
        <UpdateInterview interviewId={interviewId} onSuccess={handleUpdateInterviewSuccess}/>,
        <Link key="run" to={`/interviews/${interviewId}`}>
            <Button  type="text" icon={<CodeOutlined />} title="Перейти в интервью" />
        </Link>,
        <RemoveInterview key="remove" interviewId={interviewId} onSuccess={handlerRemoveInterviewSuccess} />
    ]), [handlerRemoveInterviewSuccess, handleUpdateInterviewSuccess]);

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
                <InterviewsFilters
                    filters={filters}
                    onChange={handleFiltersChange}
                    onClear={handleFiltersClear}
                /> 
            </Card>
            <InterviewsTable
                {...props}
                loading={isLoading}
                dataSource={data.items}
                pagination={initialPaginationParams}
                onChange={handleTableChange}
                renderRating={handleRenderRating}
                renderAuthor={handleRenderAuthor}
                renderActions={handleRenderActions}
            />
        </>
    )
}
export default InterviewsTableWithFilters;