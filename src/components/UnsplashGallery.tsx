import { UnsplashProvider } from '@/providers/unsplashProvider';
import React from 'react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import UnsplashCardSimple from './UnsplashCardSimple';

export default async function UnsplashGallery({
    searchParams,
}: {
    searchParams: UnsplashSearchParams;
}) {
    const unsplashProvider = new UnsplashProvider();

    const response: void | ApiResponse<{
        results: Basic[];
        total: number;
    }> = await unsplashProvider.fetchPhotosBySearch('cat');

    if (!response || !response.response) {
        return <h2>Loading...</h2>;
    } else if (!response.response.results || response.response.total === 0) {
        return <h2>No results</h2>;
    } else {
        return (
            <section className='overflow-y-auto max-w-6xl mx-auto grid gap-1 px-2 my-1 grid-cols-gallery'>
                {response.response.results.map((photo: Basic) => {
                    return <UnsplashCardSimple key={photo.id} photo={photo} />;
                })}
            </section>
        );
    }
}
