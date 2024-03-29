'use client';

import { PaginatorParams } from '@/types/paginatorParameters';
import { Button, Tooltip } from '@nextui-org/react';
import { ReactNode, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Paginator({
    pageNumber,
    setPageNumber,
    numberOfPages,
}: PaginatorParams): ReactNode | undefined {
    const [mounted, setMounted] = useState<boolean>(false);

    const incrementPage = (): void => {
        if (pageNumber !== undefined) {
            setPageNumber(pageNumber + 1);
        }
    };
    const decrementPage = (): void => {
        if (pageNumber !== undefined) {
            setPageNumber(pageNumber - 1);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <div className='flex justify-center self-center gap-4 h-min'>
                <>
                    <Tooltip content='Previous page' delay={800} placement='top' className='text-tiny'>
                        <Button
                            isIconOnly
                            radius='lg'
                            size='sm'
                            variant='faded'
                            aria-label='previous page'
                            onClick={decrementPage}
                            isDisabled={pageNumber < 2}
                            className='fade-in-moderate'
                        >
                            <FaChevronLeft />
                        </Button>
                    </Tooltip>
                    <Tooltip content='Page number' delay={800} placement='top' className='text-tiny'>
                        <Button
                            isIconOnly
                            radius='lg'
                            size='sm'
                            disableAnimation={true}
                            disableRipple={true}
                            variant='bordered'
                            className='fade-in-moderate cursor-default'
                        >
                            {pageNumber}
                        </Button>
                    </Tooltip>
                    <Tooltip content='Next page' delay={800} placement='top' className='text-tiny'>
                        <Button
                            isIconOnly
                            radius='lg'
                            size='sm'
                            variant='faded'
                            aria-label='next page'
                            onClick={incrementPage}
                            isDisabled={pageNumber < 1}
                            className='fade-in-moderate'
                        >
                            <FaChevronRight />
                        </Button>
                    </Tooltip>
                </>
            </div>
        );
    }
}
