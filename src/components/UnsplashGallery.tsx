import { UnsplashProvider } from '@/providers/unsplashProvider';
import React from 'react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import UnsplashCardSimple from './UnsplashCardSimple';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

export default async function UnsplashGallery({ searchParams }: { searchParams: UnsplashSearchParams }) {
    const response: void | ApiResponse<{
        results: Basic[];
        total: number;
    }> = await UnsplashProvider.fetchBySearchParams({ searchType: UnsplashSearchTypes.KEYWORD, keyword: 'cat' });

    if (!response || !response.response) {
        return <h2>Loading...</h2>;
    } else if (!response.response.results || response.response.total === 0) {
        return <h2>No results</h2>;
    } else {
        return (
            <section className='overflow-y-auto justify-center max-w-6xl mx-auto grid gap-4 px-5 pt-4 grid-cols-gallery'>
                {response.response.results.map((photo: Basic) => {
                    return <UnsplashCardSimple key={photo.id} photo={photo} />;
                })}
            </section>
        );
    }
}
