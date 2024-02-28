import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { SearchParameters } from '@/types/searchParameters';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export function generateMetadata({ params: { term } }: SearchParameters): Metadata {
    return { title: `Photo Gallery | ` + term };
}

export default function keywordSearch({ params: { term } }: SearchParameters): React.ReactNode {
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
