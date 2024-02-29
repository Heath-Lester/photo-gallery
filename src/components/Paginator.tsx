'use client';

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Selection,
    Pagination,
} from '@nextui-org/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';

export default function Paginator(): ReactNode {
    const [mounted, setMounted] = useState<boolean>(false);
    const [pageSizeSelection, setPageSizeSelection] = useState<Set<number>>(new Set([5]));
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const pageSizes = new Array<number>(5, 10, 15, 25, 50, 75, 100);

    const selectedPageSize: number | undefined = useMemo(
        () => Array.from(pageSizeSelection).at(0),
        [pageSizeSelection],
    );

    useEffect(() => {
        setMounted(true);
        setPageSizeSelection(new Set([25]));
    }, []);

    console.warn('PAGE SIZE SELECTION: ', pageSizeSelection);

    if (mounted) {
        return (
            <footer
                className={`flex flex-col sticky sm:flex-row py-4 px-5 sm:gap-0 gap-4 min-h-[65px] w-full bottom-0 z-20 align-top justify-center sm:justify-between bg-background border-solid border-t-small`}
            >
                <div className='w-20 sm:block hidden'></div>
                <div className='pt-1'>
                    <Pagination
                        className='fade-in-moderate justify-center align-middle py-auto'
                        variant='faded'
                        radius='lg'
                        showControls
                        total={numberOfPages}
                        isDisabled={numberOfPages < 2}
                        initialPage={1}
                    />
                </div>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button name='searchType' size='md' radius='lg' variant='bordered' className='px-4'>
                                {selectedPageSize}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Search types'
                            variant='flat'
                            disallowEmptySelection
                            selectionMode='single'
                            selectedKeys={pageSizeSelection}
                            onSelectionChange={(keys: Selection) => setPageSizeSelection(keys as Set<number>)}
                        >
                            <DropdownSection title='Select a page size'>
                                {pageSizes.map((size: number) => {
                                    return <DropdownItem key={size}>{size}</DropdownItem>;
                                })}
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </footer>
        );
    }
}
