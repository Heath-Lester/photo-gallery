'use client';

import { PageSizerParams } from '@/types/pageSizerParameters';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { Key, ReactNode, useEffect, useMemo, useState } from 'react';

export default function PageSizer({
    pageSizeSelection,
    setPageSizeSelection,
    pageSizes,
}: PageSizerParams): ReactNode | undefined {
    const [mounted, setMounted] = useState<boolean>(false);
    const pathname = usePathname();

    const selectedPageSize: string | undefined = useMemo(() => {
        const selection: Key | undefined = Array.from(pageSizeSelection).at(0);
        if (typeof selection === 'string') {
            return selection;
        }
    }, [pageSizeSelection]);

    // If a url is inserted, set the page count to the closest value included in the page sizes
    useEffect(() => {
        const [base, searchType, term, pageNumber, pageSize] = pathname.split('/');
        const pageSizeNumber: number = Number(pageSize);
        if (pageSize && !isNaN(pageSizeNumber)) {
            const matchingPageSize: string | undefined = pageSizes.find((size: string) => size === pageSize);
            if (matchingPageSize) {
                setPageSizeSelection(new Set([matchingPageSize]));
            } else {
                const pageSizeNumbers: number[] = pageSizes.map((size: string) => Number(size));
                const closest: number = pageSizeNumbers.reduce((previous, current) =>
                    Math.abs(current - pageSizeNumber) < Math.abs(previous - pageSizeNumber) ? current : previous,
                );
                setPageSizeSelection(new Set([closest.toString()]));
            }
        }
    }, [pathname]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <div className='flex justify-center fade-in-moderate'>
                <Dropdown size='sm'>
                    <DropdownTrigger>
                        <Button name='pageSize' size='sm' radius='lg' variant='ghost' className='px-4 self-center'>
                            {selectedPageSize}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='Page sizes'
                        variant='bordered'
                        disallowEmptySelection={true}
                        selectionMode='single'
                        selectedKeys={pageSizeSelection}
                        onSelectionChange={setPageSizeSelection}
                    >
                        <DropdownSection title='Select a page size'>
                            {pageSizes.map((size: string) => (
                                <DropdownItem key={size}>{size}</DropdownItem>
                            ))}
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}
