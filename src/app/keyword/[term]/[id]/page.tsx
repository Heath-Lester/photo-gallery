import ModalPlaceholder from '@/components/ModalPlaceholder';
import UnsplashImage from '@/components/UnsplashImage';
import { ModalParameters } from '@/types/modalParameters';
import React, { Suspense } from 'react';

export default function PhotoPage({ params: { term, id } }: ModalParameters): React.ReactNode | void {
    return (
        <div className='flex w-full h-full items-center justify-center content-center'>
            <Suspense fallback={<ModalPlaceholder />}>
                <UnsplashImage id={id} />
            </Suspense>
        </div>
    );
}
