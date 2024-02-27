import UnsplashImage from '@/components/UnsplashImage';
import UnsplashModal from '@/components/UnsplashModal';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { ModalParameters } from '@/types/modalParameters';
import { Metadata } from 'next';
import React from 'react';

export function generateMetadata({ params: { id, term } }: ModalParameters): Metadata {
    return { title: `Photo: ` + id };
}

export default function SelectedPhoto({ params: { id, term } }: ModalParameters): React.ReactNode {
    return (
        <UnsplashModal returnPath={`/${UnsplashSearchTypes.KEYWORD.toLowerCase()}/${term}`}>
            <UnsplashImage id={id} />
        </UnsplashModal>
    );
}
