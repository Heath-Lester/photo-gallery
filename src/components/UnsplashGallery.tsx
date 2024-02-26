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
    if (!searchParams.term || searchParams.term.length === 0) {
        console.warn('Provided keyword is falsy or empty');
        return <GalleryPlaceholder displayText='Search for something.' />;
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
            <section className='justify-center w-full grid mx-auto px-4 pt-5 grid-cols-gallery auto-rows-[10px]'>
                {response.response.results.map((photo: Basic) => (
                    <UnsplashCardSimple key={photo.id} photo={photo} />
                ))}
            </section>
        );
    }
}
