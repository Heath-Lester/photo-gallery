import { PaginatorParams } from './paginatorParameters';
import { PageSizerParams } from './pageSizerParameters';
/**
 * Used by the paging bar to pass state handling to the paginator and page sizer
 */
export type PaginationParams = PaginatorParams & PageSizerParams;
