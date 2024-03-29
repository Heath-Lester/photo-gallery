import { ModalParams } from '@/types/modalParameters';
import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import ModalPlaceholder from '@/components/ModalPlaceholder';
import UnsplashImage from '@/components/UnsplashImage';

export function generateMetadata({ params: { term } }: ModalParams): Metadata {
    return { title: `Photo Gallery | ` + decodeURI(term) };
}

export default function PhotoPage({ params: { id } }: ModalParams): ReactNode | void {
    return (
        <div className='flex w-full h-full items-center justify-center content-center'>
            <Suspense fallback={<ModalPlaceholder />}>
                <UnsplashImage id={id} />
            </Suspense>
        </div>
    );
}
