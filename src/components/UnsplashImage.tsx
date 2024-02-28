import { UnsplashProvider } from '@/providers/unsplashProvider';
import { ReactElement } from 'react';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import UnsplashImageDetail from './UnsplashImageDetail';
import Image from 'next/image';

export default async function UnsplashImage({ id }: { id: string }): Promise<ReactElement | undefined> {
    const image: Full | void = await UnsplashProvider.fetchPhotoByIdWithoutBlur(id);

    if (image) {
        const widthHeightRatio: number = image.height / image.width;
        const heightWidthRatio: number = image.width / image.height;

        return (
            <div className='flex flex-col-reverse lg:flex-row gap-4 p-4 rounded-lg shadow-2xl'>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl shadow-inner max-h-[80vh] max-w[80vw] h-[calc(80vh * ${heightWidthRatio}) - 192px] w-[calc(80vw * ${widthHeightRatio}) - 192px]`}
                />
                <section className='flex flex-row-reverse justify-between lg:flex-col max-h-42 lg:max-h-[unset] lg:mb-auto text-small font-semibold gap-4 p-4 lg:max-w-48 lg:min-w-48 shadow-md rounded-lg'>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center'
                    />
                    <div className='flex flex-col overflow-y-auto shadow-inner'>
                        <UnsplashImageDetail title='Name' content={image.user.name} />
                        <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                        <UnsplashImageDetail title='Location' content={image.user.location} />
                        <UnsplashImageDetail title='Bio' content={image.user.bio} />
                        <UnsplashImageDetail title='Description' content={image.description} />
                    </div>
                </section>
            </div>
        );
    }
}
