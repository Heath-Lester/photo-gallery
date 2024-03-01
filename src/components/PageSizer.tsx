'use client';

import { PageSizerParams } from '@/types/pageSizerParameters';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { Key, ReactNode, useEffect, useMemo, useState } from 'react';

export default function PageSizer({
    pageSizeSelection,
    setPageSizeSelection,
    pageSizes,
}: PageSizerParams): ReactNode | undefined {
    const [mounted, setMounted] = useState<boolean>(false);

    const selectedPageSize: string | undefined = useMemo(() => {
        const selection: Key | undefined = Array.from(pageSizeSelection).at(0);
        if (typeof selection === 'string') {
            return selection;
        }
    }, [pageSizeSelection]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <div className='flex justify-center fade-in-moderate'>
                <Dropdown size='sm'>
                    <DropdownTrigger>
                        <Button name='pageSize' size='md' radius='lg' variant='ghost' className='px-4'>
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
