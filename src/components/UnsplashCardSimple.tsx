import Image from 'next/image';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Card, Link } from '@nextui-org/react';

export default function UnsplashCardSimple({ photo }: { photo: Basic }) {
    return (
        <>
            <Card className='cursor-pointer'>
                <Link
                    href={`?modal=true&photo=` + photo.id}
                    className='relative text-white h-64 rounded-md p-1 justify-center content-center group'
                >
                    <Image
                        alt={photo.alt_description ?? 'description'}
                        src={photo.urls.full}
                        fill={true}
                        loading='lazy'
                        decoding='async'
                        data-nimg='fill'
                        className='rounded-md object-cover group-hover:opacity-80'
                        sizes='
                            (max-width: 1280px) 278px,
                            (min-width: 1040px) calc(12.73vw + 118px),
                            (min-width:800px) 33.18vw,
                            (min-width: 540px) 50vw, calc(100vw-16px)
                        '
                    />
                    <div className='overlay justify-end items-end '>{photo.user.username}</div>
                </Link>
            </Card>
        </>
    );
}
