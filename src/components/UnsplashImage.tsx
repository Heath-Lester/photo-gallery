import { UnsplashProvider } from '@/providers/unsplashProvider';
import { Card } from '@nextui-org/react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import UnsplashImageDetail from './UnsplashImageDetail';
import Image from 'next/image';

export default async function UnsplashImage({ id }: { id: string }): Promise<React.ReactElement | undefined> {
    const image: Full | undefined = await UnsplashProvider.fetchPhotoById(id).then(
        (response: ApiResponse<Full> | void) => {
            if (response && response.response) {
                return response.response;
            }
        },
    );

    if (image) {
        const widthHeightRatio: number = image.height / image.width;
        const heightWidthRatio: number = image.width / image.height;

        return (
            <div
                // radius='lg'
                // className='flex flex-row relative overflow-hidden gap-4 p-4 justify-center items-center align-middle'
                className='flex flex-col-reverse md:flex-row gap-4 p-4 rounded-lg shadow-2xl'
            >
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`rounded-2xl shadow-inner max-h-[80vh] max-w[80vw] h-[calc(80vh * ${heightWidthRatio}) - 192px] w-[calc(80vw * ${widthHeightRatio}) - 192px]`}
                    // className='max-h-[80vh] h-[80vh * ${heightWidthRatio}] max-w-[80vw] w-[80vw * ${widthHeightRatio}] rounded-lg shadow-inner'
                    // className={`object-cover max-h-[80vh] h-[80vh * ${heightWidthRatio}] max-w-[80vw] w-[80vw * ${widthHeightRatio}] rounded-md shadow-inner`}
                    // className={`object-cover max-h-[80vh] h-[80vh * ${heightWidthRatio}] max-w-[80vw] w-[80vw * ${widthHeightRatio}] rounded-md shadow-inner`}
                    // sizes='500px'
                />
                <section className='flex flex-row-reverse justify-end md:flex-col max-h-42 md:max-h-[unset] md:mb-auto text-small font-semibold gap-4 p-4 md:max-w-48 md:min-w-48 shadow-md rounded-lg'>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center'
                    />
                    <div className='flex flex-col sm:mr-auto overflow-y-auto shadow-inner'>
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
