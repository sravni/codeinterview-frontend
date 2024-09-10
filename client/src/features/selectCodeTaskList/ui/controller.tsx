import { Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";

import { LANGUAGES } from "../../../shared/consts/languages";
import { CodeTaskApi, CodeTaskModel, generateCodeTasksCommonRequestKey } from "../../../entities/codeTask";
import { Paginated } from "../../../shared/interfaces/paginated";

import { Loading } from "./loading";
import { SelectCodeTaskList } from "./view";
import { SelectCodeTaskListProps } from "./view";
import { useCallback, useState } from "react";
import styles from './styles.module.css';

const DEFAULT_LIMIT = 9;
const DEFAULT_SKIP = 0;
const DEFAULT_DATA: Paginated<CodeTaskModel> = { items: [], total: 0 };

export type SelectCodeTaskListControllerProps = Omit<SelectCodeTaskListProps, 'data'> & {
    language: LANGUAGES;
};

export const SelectCodeTaskListController = (props: SelectCodeTaskListControllerProps) => {
    const { language, ...rest } = props;
    
    const [pagination, setPagination] = useState(DEFAULT_SKIP);

    const { data = DEFAULT_DATA, isLoading, error } = useQuery({
        queryKey: [generateCodeTasksCommonRequestKey(), language, pagination],
        queryFn: () => CodeTaskApi.getCodeTasks({ language, limit: DEFAULT_LIMIT, skip: pagination })
    });

    const handlePaginationChange = useCallback((page: number) => {
        const skip = (page - 1) * DEFAULT_LIMIT;
        setPagination(skip);
    }, []);

    if (isLoading) return <Loading />
    
    if (error) return <>{error}</>;

    return (
        <>
            <SelectCodeTaskList data={data.items} {...rest} />
            <Pagination
                className={styles.pagination}
                hideOnSinglePage
                total={data.total}
                defaultCurrent={pagination}
                pageSize={DEFAULT_LIMIT}
                onChange={handlePaginationChange}
            />
        </>
    )
}