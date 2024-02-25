import env from '@/env/env';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic, Full } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import * as nodeFetch from 'node-fetch';
import { addBlurHashToUnsplashImage, addBlurHashToUnsplashImages } from '@/utils/base64img';

export class UnsplashProvider {
    private static readonly defaultPageNumber: number = 1;
    private static readonly defaultPageSize: number = 5;
    private static readonly unsplash = createApi({
        accessKey: env.UNSPLASH_ACCESS_KEY,
        fetch: nodeFetch.default as unknown as typeof fetch,
    });

    public static async fetchBySearchParams(
        searchParams: UnsplashSearchParams,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        switch (searchParams.searchType) {
            case UnsplashSearchTypes.KEYWORD: {
                return this.fetchPhotosBySearch(searchParams.input);
            }
            case UnsplashSearchTypes.TOPIC: {
                return this.fetchPhotosByTopic(searchParams.input);
            }
            case UnsplashSearchTypes.USER: {
                return this.fetchPhotosByUser(searchParams.input);
            }
            case UnsplashSearchTypes.LIST: {
                return this.fetchPhotos();
            }
            default: {
                throw Error('Unhandled search type: ', searchParams.searchType);
            }
        }
    }

    public static async fetchPhotoById(id: string): Promise<void | ApiResponse<Full>> {
        if (!id || id.length === 0) return console.error(new Error('Provided id is falsy or empty'));

        return await this.unsplash.photos
            .get({ photoId: id })
            .then((response: ApiResponse<Full>) => addBlurHashToUnsplashImage(response))
            .catch((err) => {
                console.error('Failed to fetch image by id', err);
            });
    }

    public static async fetchPhotosByUser(
        name: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        if (!name || name.length === 0) return console.error(new Error('Provided topic is falsy or empty'));

        return await this.unsplash.users
            .getPhotos({
                username: name,
                page: page ?? this.defaultPageNumber,
                perPage: perPage ?? this.defaultPageSize,
            })
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .catch((err) => {
                console.error('Failed to fetch images by user', err);
            });
    }

    public static async fetchPhotosByTopic(
        topic: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        if (!topic || topic.length === 0) return console.error('Provided topic is falsy or empty');

        return await this.unsplash.topics
            .getPhotos({
                topicIdOrSlug: topic,
                page: page ?? this.defaultPageNumber,
                perPage: perPage ?? this.defaultPageSize,
            })
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .catch((err) => {
                console.error('Failed to fetch images by topic', err);
            });
    }

    public static async fetchPhotos(
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | ApiResponse<{
        results: Basic[];
        total: number;
    }>> {
        return await this.unsplash.photos
            .list({
                page: page ?? this.defaultPageNumber,
                perPage: perPage ?? this.defaultPageSize,
            })
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .catch((err) => {
                console.error('Failed to fetch images', err);
            });
    }

    public static async fetchPhotosBySearch(
        keyword: string,
        page?: number | null,
        perPage?: number | null,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        if (!keyword || keyword.length === 0) return console.error('Provided keyword is falsy or empty');

        return await this.unsplash.search
            .getPhotos({
                query: keyword,
                page: page ?? this.defaultPageNumber,
                perPage: perPage ?? this.defaultPageSize,
            })
            .then((response: ApiResponse<{ results: Basic[]; total: number }>) => addBlurHashToUnsplashImages(response))
            .catch((err) => {
                console.error('Failed to fetch searched images', err);
            });
    }
}
