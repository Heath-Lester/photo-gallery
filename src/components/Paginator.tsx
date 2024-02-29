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
    const pageSizes = new Array<number>(5, 10, 15, 25, 50, 75, 100);

    const selectedPageSize: number | undefined = useMemo(
        () => Array.from(pageSizeSelection).at(0),
        [pageSizeSelection],
    );

    useEffect(() => {
        setMounted(true);
        setPageSizeSelection(new Set([25]));
    }, []);

    if (mounted) {
        return (
            <footer
                className={`flex flex-col sticky sm:flex-row py-2 px-5 gap-1 min-h-[65px] w-full bottom-0 z-20 align-center justify-center sm:justify-between shadow-lg bg-background border-solid border-t-small`}
            >
                <div></div>
                <Pagination
                    className='fade-in-moderate justify-center align-middle'
                    variant='faded'
                    radius='lg'
                    showControls
                    total={5}
                    initialPage={1}
                />
                <div className='flex flex-row justify-center items-center gap-2'>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button name='searchType' size='sm' radius='lg' variant='bordered' className='px-4'>
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
