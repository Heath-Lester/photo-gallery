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
import { FormEvent, useEffect, useMemo, useState } from 'react';

export default function SearchBar(): React.ReactNode | undefined {
    const [mounted, setMounted] = useState(false);
    const [searchTypes, setSearchTypes] = useState<Set<UnsplashSearchTypes>>(new Set([UnsplashSearchTypes.KEYWORD]));
    const [input, setInput] = useState('');
    const router = useRouter();

    const formName: string = 'searchForm';

    const selectedSearchType: string = useMemo(
        () => Array.from(searchTypes).join(', ').replaceAll('_', ' '),
        [searchTypes],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement | HTMLInputElement>): void => {
        event.preventDefault();
        if (!selectedSearchType) {
            throw Error(`The current search method is ${selectedSearchType}`);
        }
        const newRoute: string = `/${selectedSearchType.toLowerCase()}/${input}`;
        router.push(newRoute);
    };

    useEffect((): void => {
        setMounted(true);
        setSearchTypes(new Set([UnsplashSearchTypes.KEYWORD]));
    }, []);

    if (mounted) {
        return (
            <search className='flex flex-row max-w-screen-sm w-full items-center'>
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
                            selectedKeys={selectedSearchType}
                            onSelectionChange={(keys: Selection) => {
                                setSearchTypes(keys as Set<UnsplashSearchTypes>);
                                setInput('');
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
                        autoFocus
                        value={input}
                        onChange={(event) => setInput(event.currentTarget.value)}
                        placeholder='Press enter to search'
                        className='text-tiny rounded-l-none rounded-r-md w-full px-2 min-w-32'
                    ></input>
                </form>
            </search>
        );
    }
}
