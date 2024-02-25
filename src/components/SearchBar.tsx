'use client';

import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Input,
    Tooltip,
} from '@nextui-org/react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

export default function SearchBar() {
    const [mounted, setMounted] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(new Set([UnsplashSearchTypes.KEYWORD]));
    const [search, setSearch] = useState('');

    const selectedValue: string = useMemo(
        () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
        [selectedKeys],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <search className='flex flex-row max-w-screen-sm w-full items-center'>
                <Dropdown size='sm'>
                    <DropdownTrigger>
                        <Button size='sm' variant='flat' className='px-4 rounded-l-md rounded-r-none'>
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='Search options'
                        variant='solid'
                        disallowEmptySelection
                        selectionMode='single'
                        selectedKeys={selectedKeys}
                        onSelectionChange={(keys) => {
                            setSelectedKeys(keys as Set<UnsplashSearchTypes>);
                            setSearch('');
                        }}
                    >
                        <DropdownSection title='Select a search method'>
                            {Object.values(UnsplashSearchTypes).map((type: string) => {
                                return <DropdownItem key={type}>{type}</DropdownItem>;
                            })}
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                <form onSubmit={handleSubmit} className='flex w-full h-8'>
                    <input
                        type='text'
                        value={search}
                        name='searchInput'
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        onKeyUp={(event) => (event.key === 'Enter' ? event.currentTarget.blur() : null)}
                        placeholder='Press enter to search'
                        className='text-tiny rounded-l-none rounded-r-md w-full px-2 min-w-32'
                    ></input>
                </form>
            </search>
        );
    }
}
