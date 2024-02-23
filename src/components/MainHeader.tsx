'use client';

import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function MainHeader() {
    return (
        <header
            className={`flex sticky top-0 z-10 bg-background items-center justify-between px-4 py-2 border-solid border-b-small`}
        >
            <h1 className='text-2x1'>Photo Gallery</h1>
            <SearchBar />
            <ThemeToggle />
        </header>
    );
}
