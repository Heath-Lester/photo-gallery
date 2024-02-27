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
            <Card radius='lg' className='flex flex-row relative overflow-hidden gap-4 p-4'>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`object-cover max-h-[80vh] h-[80vh * ${heightWidthRatio}] max-w-[80vw] w-[80vw * ${widthHeightRatio}] rounded-md shadow-inner`}
                    sizes='500px'
                />
                <section className='flex flex-col ml-4 mb-auto text-small font-semibold gap-4 p-4 w-36 shadow-md rounded-md'>
                    <Image
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        width={144}
                        height={144}
                        sizes='144px'
                        className='rounded-full self-center'
                    />
                    <div className='overflow-y-auto shadow-inner'>
                        <UnsplashImageDetail title='Name' content={image.user.name} />
                        <UnsplashImageDetail title='Instagram' content={image.user.instagram_username} />
                        <UnsplashImageDetail title='Location' content={image.user.location} />
                        <UnsplashImageDetail title='Bio' content={image.user.bio} />
                        <UnsplashImageDetail title='Description' content={image.description} />
                    </div>
                </section>
            </Card>
        );
    }
}
