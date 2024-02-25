import { getPlaiceholder } from 'plaiceholder';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic, Full } from 'unsplash-js/dist/methods/photos/types';

/**
 * {@link https://www.youtube.com/watch?v=Br6f1i-QNCY&list=PL4cUxeGkcC9hYBP0AZ3MNdEiiZqd4mHGm&index=7}
 * {@link https://plaiceholder.co/docs/usage}
 * @param sourceURL - image source URL
 */
async function getBase64(imageUrl: string): Promise<string> {
    try {
        const response: Response = await fetch(imageUrl);

        if (!response.ok) {
            throw Error(`Failed to fetch image: ${response.status}, ${response.statusText} `);
        }

        const buffer: ArrayBuffer = await response.arrayBuffer();

        const { base64 }: { base64: string } = await getPlaiceholder(Buffer.from(buffer));

        return base64;
    } catch (error) {
        console.error('Failed to process placeholder', error instanceof Error ? error.stack : error);
        return '../../assets/images/no_image.png';
    }
}

/**
 * Add Blur hash to multiple images in parallel using Plaiceholder
 * {@link https://plaiceholder.co/docs}
 * @param unsplashResponse
 */
export async function addBlurHashToUnsplashImages(
    unsplashResponse: ApiResponse<{ results: Basic[]; total: number }>,
): Promise<ApiResponse<{ results: Basic[]; total: number }>> {
    if (!unsplashResponse.response || unsplashResponse.response.total === 0) throw Error('Response is falsy or empty');

    const base64Promises: Array<Promise<string>> = unsplashResponse.response.results.map((image: Basic) =>
        getBase64(image.urls.full),
    );

    const base64Results: string[] = await Promise.all(base64Promises);

    unsplashResponse.response.results.forEach(
        (image: Basic, index: number) => (image.blur_hash = base64Results[index]),
    );

    return unsplashResponse;
}

/**
 * Add blur hash ot image using Plaiceholder
 * {@link https://plaiceholder.co/docs}
 * @param unsplashResponse
 */
export async function addBlurHashToUnsplashImage(unsplashResponse: ApiResponse<Full>): Promise<ApiResponse<Full>> {
    if (!unsplashResponse.response) throw Error('Response is falsy');

    const base64Result: string = await getBase64(unsplashResponse.response.urls.full);

    unsplashResponse.response.blur_hash = base64Result;

    return unsplashResponse;
}
