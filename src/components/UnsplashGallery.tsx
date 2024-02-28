import { UnsplashProvider } from '@/providers/unsplashProvider';
import React from 'react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import GalleryPlaceholder from './GalleryPlaceholder';
import UnsplashCard from './UnsplashCard';

export default async function UnsplashGallery({
    searchParams,
}: {
    searchParams: UnsplashSearchParams;
}): Promise<React.ReactElement> {
    if (!searchParams.term || searchParams.term.length === 0) {
        return <GalleryPlaceholder displayText='Search for something.' />;
    }

    const response: void | {
        results: Basic[];
        total: number;
    } = await UnsplashProvider.fetchBySearchParams(searchParams);

    if (!response) {
        return <GalleryPlaceholder displayText='There was an issue while retrieving images' />;
    } else if (!response || !response.results || response.total === 0) {
        return <GalleryPlaceholder displayText='No results. Try searching for something else.' />;
    } else {
        return (
            <section className='justify-center w-full grid mx-auto px-4 pt-5 grid-cols-gallery auto-rows-[10px]'>
                {response.results.map((photo: Basic) => (
                    <UnsplashCard
                        key={photo.id}
                        photo={photo}
                        pathname={`${searchParams.searchType.toLowerCase()}/${searchParams.term}`}
                    />
                ))}
            </section>
        );
    }
}
