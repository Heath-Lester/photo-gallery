'use client';

import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

export default function SearchBar() {
    const [mounted, setMounted] = useState(false);

    const [selectedKeys, setSelectedKeys] = useState(new Set([UnsplashSearchTypes.SEARCH]));

    const [search, setSearch] = useState('');

    const selectedValue: string = useMemo(
        () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
        [selectedKeys],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearch('');
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    } else {
        return (
            <div className='flex justify-center items-center md:justify-between'>
                <Dropdown size='sm'>
                    <DropdownTrigger>
                        <Button size='sm' variant='bordered' className='capitalize'>
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='Search Options'
                        variant='solid'
                        disallowEmptySelection
                        selectionMode='single'
                        selectedKeys={selectedKeys}
                        onSelectionChange={(keys) => {
                            setSelectedKeys(keys as Set<UnsplashSearchTypes>);
                            setSearch('');
                        }}
                    >
                        {Object.values(UnsplashSearchTypes).map((type: string) => {
                            return <DropdownItem key={type}>{type}</DropdownItem>;
                        })}
                    </DropdownMenu>
                </Dropdown>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        placeholder='press enter to search'
                        className='p-1.5 w-[260px] text-small'
                    ></input>
                </form>
            </div>
        );
    }
}
