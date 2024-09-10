export type Paginated<T> = {
    items: T[],
    total: number;
}

export type PaginationParams = {
    limit?: number;
    skip?: number;
}