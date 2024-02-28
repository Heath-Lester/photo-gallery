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

        const originalImageClassName: string = `rounded-2xl shadow-md max-h-[80vh] max-w[80vw] h-[calc(80vh * ${heightWidthRatio}) - 192px] w-[calc(80vw * ${widthHeightRatio}) - 192px]`;

        console.warn('WIDTH TO HEIGHT RATIO: ', widthHeightRatio);
        console.warn('HEIGHT TO WIDTH RATIO: ', heightWidthRatio);

        if (widthHeightRatio >= heightWidthRatio || heightWidthRatio <= 1.6) {
            return (
                <div className='flex flex-col-reverse lg:flex-row gap-4 p-4 rounded-lg shadow-2xl'>
                    <img
                        title='vertical'
                        alt={image.alt_description ?? 'description'}
                        src={image.urls.full}
                        className={`rounded-2xl shadow-md h-[80vh]`}
                    />
                    <section className='flex flex-row-reverse justify-between lg:flex-col max-h-42 lg:max-h-[unset] lg:mb-auto text-small font-semibold gap-4 p-4 lg:max-w-48 lg:min-w-48 shadow-md rounded-lg'>
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
                    </section>
                </div>
            );
        } else {
            return (
                <div className='flex flex-col gap-4 p-4 rounded-lg shadow-2xl w-[80vw]'>
                    <section
                        className='flex flex-row font-semibold justify-between gap-4 p-4 shadow-md rounded-lg'
                        style={{ height: 336! }}
                    >
                        <div className='flex flex-col overflow-y-auto p-4 gap-2 rounded-lg shadow-inner'>
                            <UnsplashImageDetail title='Name' content={image.user.name} />
                            <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                            <UnsplashImageDetail title='Location' content={image.user.location} />
                            <UnsplashImageDetail title='Bio' content={image.user.bio} />
                            <UnsplashImageDetail title='Description' content={image.description} />
                        </div>
                        <Image
                            alt='Profile Image'
                            src={image.user.profile_image.large}
                            width={208}
                            height={208}
                            sizes='208px'
                            className='rounded-full self-center shadow-inner'
                        />
                    </section>
                    <img
                        title='landscape'
                        alt={image.alt_description ?? 'description'}
                        src={image.urls.full}
                        className={`rounded-2xl shadow-md w-full`}
                    />
                </div>
            );
        }
    }
}
