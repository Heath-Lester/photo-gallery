import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { Suspense } from 'react';

export default function Home(): React.ReactNode {
    const searchParams: UnsplashSearchParams = {
        searchType: UnsplashSearchTypes.KEYWORD,
        input: '',
    };

    return (
        <Suspense fallback={<GalleryPlaceholder displayText='Loading...' />}>
            <UnsplashGallery searchParams={searchParams} />
        </Suspense>
    );
}
