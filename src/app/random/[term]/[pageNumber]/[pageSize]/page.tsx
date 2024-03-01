import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { ReactNode, Suspense } from 'react';
import { SearchParams } from '@/types/searchParameters';
import { Metadata } from 'next';
import UnsplashGallery from '@/components/UnsplashGallery';
import GallerySpinner from '@/components/GallerySpinner';

export function generateMetadata({ params: { term } }: SearchParams): Metadata {
    return { title: `Photo Gallery | ` + decodeURI(term) };
}

export default function keywordSearch({ params: { term, pageNumber, pageSize } }: SearchParams): ReactNode {
    return (
        <Suspense fallback={<GallerySpinner />}>
            <UnsplashGallery
                searchParams={{
                    searchType: UnsplashSearchTypes.RANDOM,
                    params: { term: decodeURI(term), pageNumber, pageSize },
                }}
            />
        </Suspense>
    );
}
