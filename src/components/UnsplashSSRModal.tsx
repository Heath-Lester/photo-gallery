import Link from 'next/link';
import React, { Suspense } from 'react';
import ModalPlaceholder from './ModalPlaceholder';

export default function UnsplashSSRModal({
    children,
    returnPath,
}: {
    children: React.ReactNode;
    returnPath: string;
}): React.ReactNode {
    return (
        <Link
            href={returnPath ?? '/'}
            className='flex justify-center items-center content-center w-full h-full fixed top-0 left-0 z-30 backdrop-blur-sm'
        >
            <dialog className='flex z-50 rounded-xl'>
                <Suspense fallback={<ModalPlaceholder />}>{children}</Suspense>
            </dialog>
        </Link>
    );
}