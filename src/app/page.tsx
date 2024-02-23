import UnsplashGallery from '@/components/UnsplashGallery';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';

export default function Home() {
    const searchParams: UnsplashSearchParams = {
        searchType: UnsplashSearchTypes.SEARCH,
        keyword: 'cat',
    };

    return <UnsplashGallery searchParams={searchParams} />;
}
