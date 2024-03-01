import { PaginationParams } from '@/types/paginationParameters';
import { ReactNode, Suspense } from 'react';
import Paginator from './Paginator';
import PageSizer from './PageSizer';
import ClientComponentPlaceholder from './ClientComponentPlaceholder';

export default function PagingBar({
    numberOfPages,
    pageNumber,
    setPageNumber,
    pageSizeSelection,
    setPageSizeSelection,
    pageSizes,
}: PaginationParams): ReactNode {
    return (
        <footer
            className={`flex flex-col sticky sm:flex-row py-2 px-5 gap-3 min-h-[65px] w-full bottom-0 z-20 align-top justify-center sm:justify-between bg-background border-solid border-t-small`}
        >
            <div className='w-20 sm:block hidden'></div>
            <Suspense fallback={<ClientComponentPlaceholder />}>
                <Paginator pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />
            </Suspense>
            <Suspense fallback={<ClientComponentPlaceholder />}>
                <PageSizer
                    pageSizeSelection={pageSizeSelection}
                    setPageSizeSelection={setPageSizeSelection}
                    pageSizes={pageSizes}
                />
            </Suspense>
        </footer>
    );
}
