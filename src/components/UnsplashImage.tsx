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
            <Card className='flex flex-row h-full w-full relative overflow-hidden gap-3 px-4 py-3'>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className='object-cover h-[85vh] max-w-[85vh] rounded-md shadow-inner'
                    sizes='500px'
                />
                <section>
                    <Card className='flex flex-col mx-2 text-small font-semibold gap-3 p-4 shadow-md'>
                        <img
                            alt='Profile Image'
                            src={image.user.profile_image.large}
                            className='rounded-full h-36 w-36 my-2 shadow-inner content-center mx-auto'
                        />
                        {image.user.name ? (
                            <div className='mb-3'>
                                <p className='opacity-50'>Name</p>
                                <p className='pl-3'>{image.user.name}</p>
                            </div>
                        ) : null}
                        {image.user.instagram_username ? (
                            <div className='mb-3'>
                                <p className='opacity-50'>Instagram</p>
                                <p className='pl-3'>{image.user.instagram_username}</p>
                            </div>
                        ) : null}
                        {image.user.location ? (
                            <div className='mb-3'>
                                <p className='opacity-50'>Location:</p>
                                <p className='pl-3'>{image.user.location}</p>
                            </div>
                        ) : null}
                        {image.user.bio ? (
                            <div className='mb-3'>
                                <p className='opacity-50'>Bio</p>
                                <p className='pl-3'>{image.user.bio}</p>
                            </div>
                        ) : null}
                        {image.description ? (
                            <div className='mb-3'>
                                <p className='opacity-50'>Description</p>
                                <p className='pl-3'>{image.description}</p>
                            </div>
                        ) : null}
                    </Card>
                </section>
            </Card>
        );
    }
}
