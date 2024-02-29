import { Dispatch, SetStateAction } from 'react';

export type paginationParameters = {
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    pageNumber: number;
    setPageNumber: Dispatch<SetStateAction<number>>;
    numberOfPages: number;
};
