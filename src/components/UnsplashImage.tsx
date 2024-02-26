import { UnsplashProvider } from '@/providers/unsplashProvider';
import Image from 'next/image';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Full } from 'unsplash-js/dist/methods/photos/types';

export default async function UnsplashImage({ id }: { id: string }): Promise<React.ReactElement | undefined> {
    const response: void | ApiResponse<Full> = await UnsplashProvider.fetchPhotoById(id);
    if (response && response.response) {
        return (
            <Image
                alt={response.response.alt_description ?? 'description'}
                src={response.response.urls.full}
                height={response.response.height}
                width={response.response.width}
                placeholder='blur'
                blurDataURL={response.response.blur_hash ?? undefined}
                className='object-cover'
            />
        );
    }
}
