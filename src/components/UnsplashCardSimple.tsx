import Image from 'next/image';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Card, Link } from '@nextui-org/react';
import React from 'react';
import { PressEvent } from '@react-types/shared/';
import Router from 'next/router';

export default function UnsplashCardSimple({ photo }: { photo: Basic }): React.ReactNode {
    const widthHeightRatio: number = photo.height / photo.width;
    const cardHeight: number = Math.ceil(250 * widthHeightRatio);
    // divide card height by the auto rows pixels set in the gallery
    const rowSpan: number = Math.ceil(cardHeight / 10) - 1;

    return (
        <Card
            className='w-[250px] justify-self-center rounded-2xl mb-6'
            shadow='lg'
            isPressable
            style={{ gridRow: `span ${rowSpan}` }}
        >
            <Link
                href={`?modal=true&photo=` + photo.id}
                className='grid-place-content-center justify-center cursor-pointer text-inherit overflow-hidden group'
            >
                <Image
                    alt={photo.alt_description ?? 'description'}
                    src={photo.urls.full}
                    placeholder='blur'
                    width={250}
                    height={cardHeight}
                    blurDataURL={photo.blur_hash ?? undefined}
                    loading='lazy'
                    decoding='async'
                    data-nimg='fill'
                    className='object-cover group-hover:opacity-50 duration-700 z-10'
                    sizes='250px'
                />
                <div className='to-overlay absolute'>{photo.user.username}</div>
            </Link>
        </Card>
    );
}
