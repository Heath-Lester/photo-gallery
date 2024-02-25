'use client';

import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function MainHeader() {
    return (
        <header
            className={`flex sticky h-16 px-5 top-0 z-10 shadow-lg bg-background items-center justify-between border-solid border-b-small`}
        >
            <h1 className='text-2xl min-w-max mr-4'>Photo Gallery</h1>
            <SearchBar />
            <ThemeToggle />
        </header>
    );
}
