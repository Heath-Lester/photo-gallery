'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function UnsplashClientModal({ children }: { children: React.ReactNode }): React.ReactNode {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const handleClose = (): void => router.back();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                onClick={handleClose}
                className='flex justify-center items-center content-center w-full h-full fixed top-0 left-0 z-30 backdrop-blur-sm'
            ></div>
        );
    } else {
        return (
            <div
                onClick={handleClose}
                className='flex justify-center items-center content-center w-full h-full fixed top-0 left-0 z-30 backdrop-blur-sm'
            >
                <dialog className='flex z-50 rounded-xl'>{children}</dialog>
            </div>
        );
    }
}
