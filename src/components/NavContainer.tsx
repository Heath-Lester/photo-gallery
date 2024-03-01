'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Selection } from '@nextui-org/react';
import NavBar from './NavBar';
import PagingBar from './PagingBar';

export default function NavContainer({ children }: { children: ReactNode }): ReactNode {
    const pageSizes = new Array<string>('5', '10', '25', '50', '75', '100');
    const [mounted, setMounted] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSizeSelection, setPageSizeSelection] = useState<Selection>(new Set([pageSizes[2]]));
    const [numberOfPages, setNumberOfPages] = useState<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <>
                <NavBar
                    pageNumber={pageNumber}
                    pageSizeSelection={pageSizeSelection}
                    setNumberOfPages={setNumberOfPages}
                    setPageNumber={setPageNumber}
                />
                {children}
                <PagingBar
                    numberOfPages={numberOfPages}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    pageSizeSelection={pageSizeSelection}
                    setPageSizeSelection={setPageSizeSelection}
                    pageSizes={pageSizes}
                />
            </>
        );
    }
}
