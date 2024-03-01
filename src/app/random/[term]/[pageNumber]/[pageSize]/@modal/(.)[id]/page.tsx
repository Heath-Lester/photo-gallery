import { ModalParams } from '@/types/modalParameters';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import UnsplashModal from '@/components/UnsplashModal';
import UnsplashImage from '@/components/UnsplashImage';

export function generateMetadata({ params: { term } }: ModalParams): Metadata {
    return { title: `Photo Gallery | ` + decodeURI(term) };
}

export default function InterceptingPhotoPage({ params: { id } }: ModalParams): ReactNode {
    return (
        <UnsplashModal>
            <UnsplashImage id={id} />
        </UnsplashModal>
    );
}
