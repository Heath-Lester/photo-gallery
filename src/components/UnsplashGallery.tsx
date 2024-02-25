import { UnsplashProvider } from '@/providers/unsplashProvider';
import React from 'react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import UnsplashCardSimple from './UnsplashCardSimple';
import GalleryPlaceholder from './GalleryPlaceholder';

export default async function UnsplashGallery({
    searchParams,
}: {
    searchParams: UnsplashSearchParams;
}): Promise<React.ReactElement> {
    if (!searchParams.input || searchParams.input.length === 0) {
        console.warn('Provided keyword is falsy or empty');
        return <GalleryPlaceholder displayText='Search something' />;
    }

    const response: void | ApiResponse<{
        results: Basic[];
        total: number;
    }> = await UnsplashProvider.fetchBySearchParams(searchParams);

    if (!response || !response.response) {
        return <GalleryPlaceholder displayText='There was an issue while retrieving images' />;
    } else if (!response || !response.response || !response.response.results || response.response.total === 0) {
        return <GalleryPlaceholder displayText='No results' />;
    } else {
        return (
            <section className='overflow-y-auto justify-center w-full grid gap-4 px-5 pt-4 grid-cols-gallery'>
                {response.response.results.map((photo: Basic) => {
                    return <UnsplashCardSimple key={photo.id} photo={photo} />;
                })}
            </section>
        );
    }
}
