import { Dispatch, SetStateAction } from 'react';
import { Selection } from '@nextui-org/react';

/**
 * Parameters to pass state handling to the page sizer
 */
export type PageSizerParams = {
    /**
     * Used by the page sizer to use as it page size selection
     */
    pageSizeSelection: Selection;
    /**
     * Used by the page sizer to emit to the nav what the currently selected page size is.
     */
    setPageSizeSelection: Dispatch<SetStateAction<Selection>>;
    /**
     * Used by the page sizer to fill in options for the menu
     */
    pageSizes: Array<string>;
};
