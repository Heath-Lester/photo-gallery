import { UnsplashProvider } from '@/providers/unsplashProvider';
import { Card } from '@nextui-org/react';
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
        const widthHeightRatio: number = image.height / image.width;
        const heightWidthRatio: number = image.width / image.height;

        return (
            <Card className='flex flex-row h-full w-full relative overflow-hidden gap-3 px-4 py-3'>
                <img
                    alt={image.alt_description ?? 'description'}
                    src={image.urls.full}
                    className={`object-cover max-h-[80vh] h-[80vh * ${heightWidthRatio}] max-w-[80vw] w-[80vw * ${widthHeightRatio}] rounded-md shadow-inner`}
                    sizes='500px'
                />
                <section className='flex flex-col mx-2 mb-auto text-small font-semibold gap-3 p-4 min-w-min max-w-[15vw] shadow-md rounded-md'>
                    <img
                        alt='Profile Image'
                        src={image.user.profile_image.large}
                        className='rounded-full max-h-36 max-w-36 my-2 shadow-inner content-center self-center min-w-m'
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
                            <p className='opacity-50'>Location</p>
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
                            <p className='pl-3 max-w-fit'>{image.description}</p>
                        </div>
                    ) : null}
                </section>
            </Card>
        );
    }
}
