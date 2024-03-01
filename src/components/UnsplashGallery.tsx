import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { UnsplashProvider } from '@/providers/unsplashProvider';
import { ReactElement } from 'react';
import { Basic, Random } from 'unsplash-js/dist/methods/photos/types';
import GalleryPlaceholder from './GalleryPlaceholder';
import UnsplashCard from './UnsplashCard';

export default async function UnsplashGallery({
    searchParams,
}: {
    searchParams: UnsplashSearchParams;
}): Promise<ReactElement> {
    if (!searchParams.params.term || searchParams.params.term.length === 0) {
        return <GalleryPlaceholder displayText='Search for something.' />;
    }

    const response: void | {
        results: Basic[] | Random[];
        total: number;
    } = await UnsplashProvider.fetchBySearchParams(searchParams);

    if (!response) {
        return <GalleryPlaceholder displayText='There was an issue while retrieving images.' />;
    } else if (!response || !response.results || response.total === 0 || response.results.length === 0) {
        return <GalleryPlaceholder displayText='No results. Try searching for something else.' />;
    } else {
        return (
            <section className='justify-center w-full grid mx-auto px-4 pt-5 pb-8 grid-cols-gallery auto-rows-[10px]'>
                {response.results.map((photo: Basic) => (
                    <UnsplashCard
                        key={photo.id}
                        photo={photo}
                        pathname={
                            searchParams.searchType.toLowerCase() +
                            '/' +
                            searchParams.params.term +
                            '/' +
                            searchParams.params.pageNumber +
                            '/' +
                            searchParams.params.pageSize
                        }
                    />
                ))}
            </section>
        );
    }
}
