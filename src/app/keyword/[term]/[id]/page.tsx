import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { ModalParameters } from '@/types/modalParameters';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export function generateMetadata({ params: { id, term } }: ModalParameters): Metadata {
    return { title: `Photo: ` + id };
}

export default function SelectedPhoto({ params: { id, term } }: ModalParameters): React.ReactNode | void {
    return (
        <Suspense fallback={<GalleryPlaceholder displayText='Loading...' />}>
            <UnsplashGallery
                searchParams={{
                    searchType: UnsplashSearchTypes.KEYWORD,
                    term,
                }}
            />
        </Suspense>
    );
}
