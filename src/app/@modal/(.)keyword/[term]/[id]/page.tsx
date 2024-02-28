import UnsplashImage from '@/components/UnsplashImage';
import { ModalParameters } from '@/types/modalParameters';
import React from 'react';
import UnsplashClientModal from '@/components/UnsplashClientModal';
import UnsplashSSRModal from '@/components/UnsplashSSRModal';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

export default function InterceptingPhotoPage({ params: { term, id } }: ModalParameters): React.ReactNode {
    const ssrModal: React.ReactNode = (
        <UnsplashSSRModal returnPath={`/${UnsplashSearchTypes.KEYWORD.toLowerCase()}/${term}`}>
            <UnsplashImage id={id} />
        </UnsplashSSRModal>
    );

    const clientModal: React.ReactNode = (
        <UnsplashClientModal>
            <UnsplashImage id={id} />
        </UnsplashClientModal>
    );

    return ssrModal;
}
