import Image from 'next/image';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Card, Link } from '@nextui-org/react';

export default function UnsplashCardSimple({ photo }: { photo: Basic }) {
    return (
        <Card className='cursor-pointer rounded-2xl'>
            <Link
                href={`?modal=true&photo=` + photo.id}
                className='relative text-inherit min-h-72 justify-center content-center group'
            >
                <Image
                    alt={photo.alt_description ?? 'description'}
                    src={photo.urls.full}
                    placeholder='blur'
                    blurDataURL={photo.blur_hash ?? undefined}
                    fill={true}
                    loading='lazy'
                    decoding='async'
                    data-nimg='fill'
                    className='object-cover overflow-hidden group-hover:opacity-50 duration-700'
                    sizes='
                            (max-width: 1280px) 278px,
                            (min-width: 1040px) calc(12.73vw + 118px),
                            (min-width:800px) 33.18vw,
                            (min-width: 540px) 50vw, calc(100vw-16px)
                        '
                />
                <div className='overlay mb-12'>{photo.user.username}</div>
            </Link>
        </Card>
    );
}
