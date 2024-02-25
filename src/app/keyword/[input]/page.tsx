import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import React, { Suspense } from 'react';

export function generateMetadata({ input }: { input: string }): UnsplashSearchParams {
    return { searchType: UnsplashSearchTypes.KEYWORD, input: input };
}

export default function keywordSearch({ searchParams }: { searchParams: UnsplashSearchParams }): React.ReactNode {
    console.warn('Keyword search successful: ', searchParams);
    return (
        <Suspense fallback={<GalleryPlaceholder displayText='Loading...' />}>
            <UnsplashGallery searchParams={{ searchType: searchParams.searchType, input: searchParams.input }} />
        </Suspense>
    );
}
