'use client';

import { Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function UnsplashModal({ children }: { children: React.ReactNode }): React.ReactNode | null {
    const pathname: string = usePathname();

    if (pathname === '/') return null;

    return (
        <dialog className='flex shadow-2xl fixed justify-self-center self-center z-40 rounded-lg backdrop-blur-xl'>
            <Link href='/' />
            {children}
        </dialog>
    );
}
