'use client';

import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Selection,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { Key, ReactNode, useEffect, useMemo, useState, FormEvent, KeyboardEvent } from 'react';
import ClientComponentPlaceholder from './ClientComponentPlaceholder';
import { NavigationParams } from '@/types/navigationParameters';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function SearchBar({
    pageNumber,
    setPageNumber,
    pageSizeSelection,
    setNumberOfPages,
}: NavigationParams): ReactNode | undefined {
    const [mounted, setMounted] = useState<boolean>(false);
    const [searchTypeSelection, setSearchTypeSelection] = useState<Selection>(
        new Set([UnsplashSearchTypes.KEYWORD.valueOf()]),
    );
    const [term, setTerm] = useState<string>('');
    const router: AppRouterInstance = useRouter();
    const pathname = usePathname();

    const selectedSearchType: string | undefined = useMemo(() => {
        const selectedType: Key | undefined = Array.from(searchTypeSelection).at(0);
        if (typeof selectedType === 'string') {
            return selectedType;
        }
    }, [searchTypeSelection]);

    const selectedPageSize: string | undefined = useMemo(() => {
        const selection: Key | undefined = Array.from(pageSizeSelection).at(0);
        if (typeof selection === 'string') {
            return selection;
        }
    }, [pageSizeSelection]);

    const navigate = (): void => {
        if (
            selectedSearchType &&
            term &&
            pageNumber > 0 &&
            term.length > 0 &&
            selectedPageSize &&
            selectedPageSize.length > 0
        ) {
            const newRoute: string = `/${selectedSearchType.toLowerCase()}/${term}/${pageNumber}/${selectedPageSize}`;
            router.push(newRoute);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (pageNumber === 1) {
            navigate();
        } else {
            setPageNumber(1);
        }
    };

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    };

    useEffect(() => {
        navigate();
    }, [pageNumber]);

    useEffect(() => {
        navigate();
    }, [selectedPageSize]);

    // Handle url insertion
    useEffect(() => {
        const [base, searchType, term, pageNumber] = pathname.split('/');
        if (pageNumber) {
            const inputPageNumber: number = Number(pageNumber);
            const matchingSearchType: string | undefined = Object.values(UnsplashSearchTypes).find(
                (value: string) => value.toLowerCase === searchType.toLowerCase,
            );

            if (matchingSearchType) {
                setSearchTypeSelection(new Set([matchingSearchType]));
            }

            // Set the number from the url so pagination can be accurate
            if (!isNaN(inputPageNumber)) {
                if (inputPageNumber > 1000 || inputPageNumber < 0) {
                    setPageNumber(1);
                } else {
                    setPageNumber(Math.round(inputPageNumber));
                }
            } else {
                setPageNumber(1);
            }
        }

        // If at root reset input string
        if (!searchType || searchType.length === 0 || !term) {
            setTerm('');
        } else {
            setTerm(decodeURI(term));
        }
    }, [pathname]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <ClientComponentPlaceholder />;
    } else {
        return (
            <search onSubmit={handleSubmit} className='flex flex-row max-w-screen-sm w-full items-center fade-in-fast'>
                <form className='flex w-full h-8'>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button
                                name='searchType'
                                size='sm'
                                variant='flat'
                                className='px-4 rounded-l-md rounded-r-none'
                            >
                                {selectedSearchType}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Search types'
                            variant='solid'
                            disallowEmptySelection={true}
                            selectionMode='single'
                            disabledKeys={[
                                UnsplashSearchTypes.LIST.valueOf(),
                                UnsplashSearchTypes.TOPIC.valueOf(),
                                UnsplashSearchTypes.RANDOM.valueOf(),
                            ]}
                            selectedKeys={searchTypeSelection}
                            onSelectionChange={(keys: Selection) => {
                                setSearchTypeSelection(keys);
                                setTerm('');
                            }}
                        >
                            <DropdownSection title='Select a search method'>
                                {Object.values(UnsplashSearchTypes).map((type: string) => (
                                    <DropdownItem key={type}>{type}</DropdownItem>
                                ))}
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                    <input
                        type='text'
                        name='search-input'
                        autoFocus={true}
                        value={term}
                        onChange={(event) => setTerm(event.currentTarget.value)}
                        onKeyUp={handleEnter}
                        placeholder='Press enter to search'
                        className='text-tiny rounded-l-none rounded-r-md w-full px-2 min-w-32'
                    ></input>
                </form>
            </search>
        );
    }
}
