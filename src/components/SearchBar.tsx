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
import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import ClientComponentPlaceholder from './ClientComponentPlaceholder';

export default function SearchBar(): ReactNode | undefined {
    const [mounted, setMounted] = useState(false);
    const [searchTypes, setSearchTypes] = useState<Set<UnsplashSearchTypes>>(new Set([UnsplashSearchTypes.KEYWORD]));
    const [term, setTerm] = useState('');
    const router = useRouter();

    const selectedSearchType: string = useMemo(
        () => Array.from(searchTypes).join(', ').replaceAll('_', ' '),
        [searchTypes],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement | HTMLInputElement>): void => {
        event.preventDefault();
        if (!selectedSearchType) {
            throw Error(`The current search method is ${selectedSearchType}`);
        }
        event.currentTarget.blur();
        const newRoute: string = `/${selectedSearchType.toLowerCase()}/${term}`;
        router.push(newRoute);
    };

    useEffect((): void => {
        setMounted(true);
        setSearchTypes(new Set([UnsplashSearchTypes.KEYWORD]));
    }, []);

    if (!mounted) {
        return <ClientComponentPlaceholder />;
    } else {
        return (
            <search className='flex flex-row max-w-screen-sm w-full items-center fade-in-fast'>
                <form onSubmit={handleSubmit} className='flex w-full h-8'>
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
                            disallowEmptySelection
                            selectionMode='single'
                            disabledKeys={[UnsplashSearchTypes.LIST.valueOf(), UnsplashSearchTypes.TOPIC.valueOf()]}
                            selectedKeys={selectedSearchType}
                            onSelectionChange={(keys: Selection) => {
                                setSearchTypes(keys as Set<UnsplashSearchTypes>);
                                setTerm('');
                                return;
                            }}
                        >
                            <DropdownSection title='Select a search method'>
                                {Object.values(UnsplashSearchTypes).map((type: string) => {
                                    return <DropdownItem key={type}>{type}</DropdownItem>;
                                })}
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                    <input
                        type='text'
                        name='search-input'
                        autoFocus
                        value={term}
                        onChange={(event) => setTerm(event.currentTarget.value)}
                        onKeyUp={(event) => (event.key === 'Enter' ? event.currentTarget.blur() : null)}
                        placeholder='Press enter to search'
                        className='text-tiny rounded-l-none rounded-r-md w-full px-2 min-w-32'
                    ></input>
                </form>
            </search>
        );
    }
}
