import { Dispatch, SetStateAction } from 'react';
import { Selection } from '@nextui-org/react';
/**
 * Parameters used to pass pagination values to the navigation
 */
export type NavigationParams = {
    /**
     * Used by the nav to know what the currently selected page is.
     */
    pageSizeSelection: Selection;
    /**
     * Used by the nav to know what the currently selected page is.
     */
    pageNumber: number;
    /**
     * Used by the nav to reset the page number after a new search.
     */
    setPageNumber: Dispatch<SetStateAction<number>>;
    /**
     * Used by the nav to emit to the paginator how many pages are available.
     */
    setNumberOfPages: Dispatch<SetStateAction<number>>;
};
