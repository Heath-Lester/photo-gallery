'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function UnsplashModal({ children }: { children: React.ReactNode }): React.ReactNode {
    const router = useRouter();
    const handleClose = (): void => router.back();

    return (
        <div
            onClick={handleClose}
            className='flex justify-center items-center content-center w-full h-full fixed top-0 left-0 z-30 backdrop-blur-sm'
        >
            <dialog className='flex shadow-2xl z-50 rounded-lg'>{children}</dialog>
        </div>
    );
}
