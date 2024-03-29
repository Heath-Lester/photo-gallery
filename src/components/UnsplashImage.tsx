import { UnsplashProvider } from '@/providers/unsplashProvider';
import { ReactElement } from 'react';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import UnsplashImageDetail from './UnsplashImageDetail';
import Image from 'next/image';

export default async function UnsplashImage({ id }: { id: string }): Promise<ReactElement | undefined> {
    const image: Full | void = await UnsplashProvider.fetchPhotoByIdWithoutBlur(id);

    if (image) {
        const verticalView: ReactElement = (
            <div className='flex flex-col xl:flex-row-reverse gap-4 p-4 rounded-lg shadow-2xl w-min'>
                <div className='flex flex-col text-small font-semibold gap-4 p-4 shadow-md rounded-lg'>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center shadow-inner h-auto w-auto'
                    />
                    <div className='flex flex-col overflow-y-auto p-4 gap-2 rounded-lg shadow-inner max-h-[10vh] h-min xl:max-h-[unset] min-w-70 w-auto xl:w-72'>
                        <UnsplashImageDetail title='Name' content={image.user.name} />
                        <UnsplashImageDetail title='Unsplash Username' content={image.user.username} />
                        <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                        <UnsplashImageDetail title='Location' content={image.user.location} />
                        <UnsplashImageDetail title='Bio' content={image.user.bio} />
                        <UnsplashImageDetail title='Description' content={image.description} />
                    </div>
                </div>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl h-auto w-auto shadow-md max-h-[60vh] xl:max-h-[80vh] xl:max-w-[80vw] max-w-[70vw]`}
                />
            </div>
        );

        const landscapeView: ReactElement = (
            <div className='flex flex-col gap-4 p-4 rounded-lg shadow-2xl max-w-[80vw] h-fit'>
                <div className='flex flex-col-reverse md:flex-row font-semibold justify-between gap-4 w-full p-4 shadow-md rounded-lg'>
                    <div
                        className='flex flex-col overflow-y-auto p-4 gap-2 rounded-lg shadow-inner'
                        style={{ height: 316! }}
                    >
                        <UnsplashImageDetail title='Name' content={image.user.name} />
                        <UnsplashImageDetail title='Unsplash Username' content={image.user.username} />
                        <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                        <UnsplashImageDetail title='Location' content={image.user.location} />
                        <UnsplashImageDetail title='Bio' content={image.user.bio} />
                        <UnsplashImageDetail title='Description' content={image.description} />
                    </div>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center shadow-inner'
                    />
                </div>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl shadow-md w-full`}
                />
            </div>
        );

        const heightWidthRatio: number = image.width / image.height;

        return heightWidthRatio <= 1.7 ? verticalView : landscapeView;
    }
}
