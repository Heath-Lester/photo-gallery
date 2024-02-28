import { ReactNode, Suspense } from 'react';
import ClientComponentPlaceholder from './ClientComponentPlaceholder';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import Link from 'next/link';

export default function NavBar(): ReactNode {
    return (
        <header
            className={`sticky pt-3 pb-3 px-5 min-h-[65px] top-0 z-20 shadow-lg bg-background border-solid border-b-small`}
        >
            <nav className='flex flex-col items-center gap-1 sm:flex-row'>
                <h1 className='text-2xl whitespace-nowrap sm:mr-4'>
                    <Link href='/'>Photo Gallery</Link>
                </h1>
                <div className='w-4 2xl:w-5/12 xl:w-3/12 lg:w-2/12 md:w-1/12'></div>
                <div className='flex flex-row items-center w-full justify-between'>
                    <Suspense fallback={<ClientComponentPlaceholder />}>
                        <SearchBar />
                    </Suspense>
                    <div className='w-4 lg:w-3/12 md:w-2/12 sm:w-1/12'></div>
                    <Suspense fallback={<ClientComponentPlaceholder />}>
                        <ThemeToggle />
                    </Suspense>
                </div>
            </nav>
        </header>
    );
}
