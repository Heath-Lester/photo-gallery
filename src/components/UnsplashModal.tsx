'use client';

import { Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function UnsplashModal({ children }: { children: React.ReactNode }): React.ReactNode | null {
    const pathname: string = usePathname();

    console.warn('PATHNAME: ', pathname);

    return (
        <Link
            href={pathname}
            className='flex tap-highlight-none transition-none hover:opacity-100 justify-center items-center content-center w-full h-full fixed filter top-0 left-0 z-30 backdrop-blur-sm'
        >
            <dialog className='flex shadow-2xl fixed transform z-50 rounded-lg object-cover'>{children}</dialog>
        </Link>
    );
}
