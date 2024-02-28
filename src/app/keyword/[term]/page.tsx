import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { ReactNode, Suspense } from 'react';
import { SearchParameters } from '@/types/searchParameters';
import { Metadata } from 'next';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';

export function generateMetadata({ params: { term } }: SearchParameters): Metadata {
    return { title: `Photo Gallery | ` + term };
}

export default function keywordSearch({ params: { term } }: SearchParameters): ReactNode {
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
