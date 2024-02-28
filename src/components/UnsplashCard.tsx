import { ReactNode } from 'react';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function UnsplashCard({ photo, pathname }: { photo: Basic; pathname: string }): ReactNode {
    const widthHeightRatio: number = photo.height / photo.width;
    const cardHeight: number = Math.ceil(250 * widthHeightRatio);
    // divide card height by the auto rows pixels set in the gallery
    const rowSpan: number = Math.ceil(cardHeight / 10) + 1;

    return (
        <Card
            className='w-[250px] justify-self-center rounded-2xl mb-6 fade-in-fast'
            shadow='lg'
            isPressable
            style={{ gridRow: `span ${rowSpan}` }}
        >
            <Link
                href={`/${pathname}/${photo.id}`}
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
