'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import ModalPlaceholder from './ModalPlaceholder';

export default function UnsplashModal({ children }: { children: React.ReactNode }): React.ReactNode {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const main: HTMLElement | null = document.getElementById('view-port');
    const handleClose = (): void => {
        if (main) main.style.overflow = 'auto';
        router.back();
    };

    useEffect(() => {
        setMounted(true);
        if (main) main.style.overflow = 'hidden';
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
                className='flex w-full cursor-pointer h-full overflow-auto fixed top-0 left-0 z-30 backdrop-blur-sm'
            >
                <dialog
                    onClick={(event) => event.stopPropagation()}
                    className='flex z-50 rounded-2xl cursor-default justify-self-center self-center my-8'
                >
                    <Suspense fallback={<ModalPlaceholder />}>{children}</Suspense>
                </dialog>
            </div>
        );
    }
}
