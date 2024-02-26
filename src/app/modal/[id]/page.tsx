import UnsplashImage from '@/components/UnsplashImage';
import UnsplashModal from '@/components/UnsplashModal';
import { ModalParameters } from '@/types/modalParameters';
import { Metadata } from 'next';
import React from 'react';

export function generateMetadata({ params: { id } }: ModalParameters): Metadata {
    console.warn('GENERATING METADATA: ', id);
    return { title: `Photo Gallery: ` + id };
}

export default function SelectedPhoto({ params: { id } }: ModalParameters): React.ReactNode {
    console.warn('SELECTED PHOTO: ', id);
    return (
        <UnsplashModal>
            <UnsplashImage id={id} />
        </UnsplashModal>
    );
}
