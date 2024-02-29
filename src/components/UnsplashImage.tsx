import { UnsplashProvider } from '@/providers/unsplashProvider';
import { ReactElement } from 'react';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import UnsplashImageDetail from './UnsplashImageDetail';
import Image from 'next/image';

export default async function UnsplashImage({ id }: { id: string }): Promise<ReactElement | undefined> {
    const image: Full | void = await UnsplashProvider.fetchPhotoByIdWithoutBlur(id);

    if (image) {
        // const originalImageClassName: string = `rounded-2xl shadow-md max-h-[80vh] max-w[80vw] h-[calc(80vh * ${heightWidthRatio}) - 192px] w-[calc(80vw * ${widthHeightRatio}) - 192px]`;
        const verticalView: ReactElement = (
            <div className='flex flex-col-reverse md:flex-row gap-4 p-4 h-[80vh] max-w-[80vw] rounded-lg shadow-2xl'>
                <img
                    title='vertical'
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl shadow-md`}
                />
                <div className='flex flex-col text-small font-semibold gap-4 p-4 shadow-md rounded-lg'>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center shadow-inner'
                    />
                    <div className='flex flex-col overflow-y-auto'>
                        <UnsplashImageDetail title='Name' content={image.user.name} />
                        <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                        <UnsplashImageDetail title='Location' content={image.user.location} />
                        <UnsplashImageDetail title='Bio' content={image.user.bio} />
                        <UnsplashImageDetail title='Description' content={image.description} />
                    </div>
                </div>
            </div>
        );

        const landscapeView: ReactElement = (
            <div className='flex flex-col gap-4 p-4 rounded-lg shadow-2xl w-[80vw]'>
                <div className='flex flex-col-reverse md:flex-row font-semibold justify-between gap-4 w-36 p-4 shadow-md rounded-lg'>
                    <div
                        className='flex flex-col overflow-y-auto p-4 gap-2 rounded-lg shadow-inner'
                        style={{ height: 316! }}
                    >
                        <UnsplashImageDetail title='Name' content={image.user.name} />
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
                    title='landscape'
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl shadow-md w-full`}
                />
            </div>
        );

        const heightWidthRatio: number = image.width / image.height;

        console.warn('HEIGHT TO WIDTH RATIO: ', heightWidthRatio);

        return heightWidthRatio <= 1.7 ? verticalView : landscapeView;
    }
}
