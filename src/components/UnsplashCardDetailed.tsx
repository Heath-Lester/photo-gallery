/* eslint-disable @next/next/no-async-client-component */
'use client';

import { UnsplashProvider } from '@/providers/unsplashProvider';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Full } from 'unsplash-js/dist/methods/photos/types';

export default async function UnsplashCardDetailed() {
    const searchParams = useSearchParams();
    if (!searchParams) return null;
    const key: string | null = searchParams.get('photo');

    if (!key) {
        return null;
    }

    const unsplashProvider = new UnsplashProvider();

    const response: void | ApiResponse<Full> = await unsplashProvider.fetchPhotoById(key);

    if (!response || !response.response) {
        return <h2>Loading...</h2>;
    } else if (!response.response.id) {
        return <h2>No results</h2>;
    } else {
        return (
            <Card className='modal fade' id='cardDetailed' role='dialog'>
                <CardBody>
                    <Image
                        alt={response.response.alt_description ?? 'description'}
                        src={response.response.urls.full}
                        height={response.response.height}
                        width={response.response.width}
                        loading='lazy'
                        decoding='async'
                        data-nimg='fill'
                        className='rounded-md'
                    />
                </CardBody>
            </Card>
        );
    }
}
