'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
    return (
        <header className={`sticky py-3 px-5 top-0 z-10 shadow-lg bg-background border-solid border-b-small`}>
            <nav className='flex flex-col items-center sm:flex-row'>
                <h1 className='text-2xl min-w-max sm:mr-4'>
                    <Link href='/'>Photo Gallery</Link>
                </h1>
                <div className='w-4 2xl:w-5/12 xl:w-3/12 lg:w-2/12 md:w-1/12'></div>
                <div className='flex flex-row items-center w-full justify-between'>
                    <SearchBar />
                    <div className='w-4 lg:w-3/12 md:w-2/12 sm:w-1/12'></div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
