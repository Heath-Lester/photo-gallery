import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { ReactNode, Suspense } from 'react';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';

export default function Home(): ReactNode {
    const searchParams: UnsplashSearchParams = {
        searchType: UnsplashSearchTypes.KEYWORD,
        term: '',
    };

    return (
        <Suspense fallback={<GalleryPlaceholder displayText='Loading...' />}>
            <UnsplashGallery searchParams={searchParams} />
        </Suspense>
    );
}
