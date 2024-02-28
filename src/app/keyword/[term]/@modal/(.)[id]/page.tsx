import UnsplashImage from '@/components/UnsplashImage';
import { ModalParameters } from '@/types/modalParameters';
import React from 'react';
import UnsplashClientModal from '@/components/UnsplashClientModal';
import { Metadata } from 'next';

export function generateMetadata({ params: { term, id } }: ModalParameters): Metadata {
    return { title: `Photo Gallery | ` + term };
}

export default function InterceptingPhotoPage({ params: { term, id } }: ModalParameters): React.ReactNode {
    return (
        <UnsplashClientModal>
            <UnsplashImage id={id} />
        </UnsplashClientModal>
    );
}
