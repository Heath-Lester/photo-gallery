import UnsplashImage from '@/components/UnsplashImage';
import { ModalParameters } from '@/types/modalParameters';
import { Metadata } from 'next';
import React from 'react';
import UnsplashClientModal from '@/components/UnsplashClientModal';
import UnsplashSSRModal from '@/components/UnsplashSSRModal';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

export function generateMetadata({ params: { term, id } }: ModalParameters): Metadata {
    return { title: `Photo: ` + id };
}

export default function SelectedPhoto({ params: { term, id } }: ModalParameters): React.ReactNode {
    return (
        <UnsplashSSRModal returnPath={`/${UnsplashSearchTypes.KEYWORD.toLowerCase()}/${term}`}>
            <UnsplashImage id={id} />
        </UnsplashSSRModal>
    );
}
