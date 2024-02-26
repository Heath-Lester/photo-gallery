import { UnsplashProvider } from '@/providers/unsplashProvider';
import { Card } from '@nextui-org/react';
import { px } from 'framer-motion';
import Image from 'next/image';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Full } from 'unsplash-js/dist/methods/photos/types';

export default async function UnsplashImage({ id }: { id: string }): Promise<React.ReactElement | undefined> {
    const image: Full | undefined = await UnsplashProvider.fetchPhotoById(id).then(
        (response: ApiResponse<Full> | void) => {
            if (response && response.response) {
                return response.response;
            }
        },
    );

    if (image) {
        const heightWidthRatio: number = image.width / image.height;
        const cardWidth: number = Math.ceil(500 * heightWidthRatio);

        return (
            <Card className='flex flex-row h-full w-full relative overflow-hidden gap-4 px-4 py-3'>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className='object-cover h-[85vh] max-w-[85vh] rounded-md'
                    sizes='500px'
                />
                <section className='flex flex-col p-2 text-small items-center'>
                    <img
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        className='rounded-full h-24 w-24 mb-6'
                    />
                    <div className='flex flex-col gap-4'>
                        <p>{image.user.name}</p>
                        <p>Instagram: {image.user.instagram_username}</p>
                        <p>Location: {image.user.location}</p>
                        <p>{image.user.bio}</p>
                        <p>{image.description}</p>
                    </div>
                </section>
            </Card>
        );
    }
}
