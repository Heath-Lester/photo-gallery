import { Dispatch, SetStateAction } from 'react';

/**
 * Used by the paginator to access state handling
 */
export type PaginatorParams = {
    /**
     * Used by both the paginator and the nav to communicate the current page and resets.
     */
    pageNumber: number;
    /**
     * Used by the paginator to emit to the nav what the currently selected page number is.
     */
    setPageNumber: Dispatch<SetStateAction<number>>;
    /**
     * Used by the paginator to know how many pages exist.
     */
    numberOfPages: number;
};
