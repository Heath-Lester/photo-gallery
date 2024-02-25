import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { Suspense } from 'react';

export default function Home() {
    const searchParams: UnsplashSearchParams = {
        searchType: UnsplashSearchTypes.KEYWORD,
        keyword: 'cat',
    };

    return (
        <Suspense fallback={<span className='flex m-6 justify-center'>Loading...</span>}>
            <UnsplashGallery searchParams={searchParams} />
        </Suspense>
    );
}
