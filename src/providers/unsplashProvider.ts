import {
    addBlurHashToUnsplashImage,
    addBlurHashToUnsplashImages,
    addBlurHashToUnsplashRandomImages,
} from '@/utils/base64img';
import { AdditionalFetchOptions } from 'unsplash-js/dist/helpers/request';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic, Full, Random } from 'unsplash-js/dist/methods/photos/types';
import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import env from '@/env/env';

export class UnsplashProvider {
    private static readonly defaultPageNumber: number = 1;
    private static readonly defaultPageSize: number = 10;
    private static readonly fetchOptions: AdditionalFetchOptions = {
        // cache: 'no-store',
    };
    private static readonly unsplash = createApi({
        accessKey: env.UNSPLASH_ACCESS_KEY,
        fetch: nodeFetch.default as unknown as typeof fetch,
    });

    public static async fetchBySearchParams(
        searchParams: UnsplashSearchParams,
    ): Promise<void | { results: Basic[]; total: number }> {
        switch (searchParams.searchType) {
            case UnsplashSearchTypes.KEYWORD: {
                return this.fetchPhotosBySearch(searchParams.term);
            }
            case UnsplashSearchTypes.TOPIC: {
                return this.fetchPhotosByTopic(searchParams.term);
            }
            case UnsplashSearchTypes.USER: {
                return this.fetchPhotosByUser(searchParams.term);
            }
            case UnsplashSearchTypes.LIST: {
                return this.fetchPhotos();
            }
            default: {
                throw Error('Unhandled search type: ', searchParams.searchType);
            }
        }
    }

    public static async fetchPhotoById(id: string): Promise<void | Full> {
        if (!id || id.length === 0) return console.error(new Error('Provided id is falsy or empty'));

        return await this.unsplash.photos
            .get({ photoId: id }, this.fetchOptions)
            .then((response: ApiResponse<Full>) => addBlurHashToUnsplashImage(response))
            .then((response: ApiResponse<Full>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch image by id', err);
            });
    }

    public static async fetchPhotoByIdWithoutBlur(id: string): Promise<void | Full> {
        if (!id || id.length === 0) return console.error(new Error('Provided id is falsy or empty'));

        return await this.unsplash.photos
            .get({ photoId: id }, this.fetchOptions)
            .then((response: ApiResponse<Full>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch image by id', err);
            });
    }

    public static async fetchPhotosByUser(
        name: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | { results: Basic[]; total: number }> {
        if (!name || name.length === 0) return console.error(new Error('Provided topic is falsy or empty'));

        return await this.unsplash.users
            .getPhotos(
                {
                    username: name,
                    page: page ?? this.defaultPageNumber,
                    perPage: perPage ?? this.defaultPageSize,
                },
                this.fetchOptions,
            )
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch images by user', err);
            });
    }

    public static async fetchPhotosByTopic(
        topic: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | { results: Basic[]; total: number }> {
        if (!topic || topic.length === 0) return console.error('Provided topic is falsy or empty');

        return await this.unsplash.topics
            .getPhotos(
                {
                    topicIdOrSlug: topic,
                    page: page ?? this.defaultPageNumber,
                    perPage: perPage ?? this.defaultPageSize,
                },
                this.fetchOptions,
            )
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch images by topic', err);
            });
    }

    public static async fetchRandomPhotos(page?: number | null, perPage?: number | null): Promise<void | Random[]> {
        return await this.unsplash.photos
            .getRandom(
                {
                    count: perPage ?? this.defaultPageSize,
                },
                this.fetchOptions,
            )
            .then((response: ApiResponse<Random | Random[]>) => {
                response.response = new Array<Random>().concat(response.response ?? []);
                return response as ApiResponse<Random[]>;
            })
            .then((response: ApiResponse<Random[]>) => addBlurHashToUnsplashRandomImages(response))
            .then((response: ApiResponse<Random[]>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch images by topic', err);
            });
    }

    public static async fetchPhotos(
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | {
        results: Basic[];
        total: number;
    }> {
        return await this.unsplash.photos
            .list(
                {
                    page: page ?? this.defaultPageNumber,
                    perPage: perPage ?? this.defaultPageSize,
                },
                this.fetchOptions,
            )
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch images', err);
            });
    }

    public static async fetchPhotosBySearch(
        keyword: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | { results: Basic[]; total: number }> {
        if (!keyword || keyword.length === 0) return console.error('Provided keyword is falsy or empty');

        return await this.unsplash.search
            .getPhotos(
                {
                    query: keyword,
                    page: page ?? this.defaultPageNumber,
                    perPage: perPage ?? this.defaultPageSize,
                },
                this.fetchOptions,
            )
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => response.response)
            .catch((err) => {
                console.error('Failed to fetch searched images', err);
            });
    }
}
