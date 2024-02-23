import env from '@/env/env';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic, Full } from 'unsplash-js/dist/methods/photos/types';
import { UnsplashSearchParams } from '@/types/unsplashSearchParams';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';
import * as nodeFetch from 'node-fetch';

export class UnsplashProvider {
    private defaultPageNumber: number = 1;
    private defaultPageSize: number = 5;
    private unsplash = createApi({
        accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
        fetch: nodeFetch.default as unknown as typeof fetch,
    });

    public async fetchBySearchParams(
        searchParams: UnsplashSearchParams,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        switch (searchParams.searchType) {
            case UnsplashSearchTypes.SEARCH: {
                return this.fetchPhotosBySearch(searchParams.keyword);
            }
            case UnsplashSearchTypes.TOPIC: {
                return this.fetchPhotosByTopic(searchParams.keyword);
            }
            case UnsplashSearchTypes.USER: {
                return this.fetchPhotosByUser(searchParams.keyword);
            }
            case UnsplashSearchTypes.LIST: {
                return this.fetchPhotos();
            }
            default: {
                throw Error('Unhandled search type: ', searchParams.searchType);
            }
        }
    }

    public async fetchPhotoById(id: string): Promise<void | ApiResponse<Full>> {
        return await this.unsplash.photos.get({ photoId: id }).catch((err) => {
            console.error('Failed to fetch image by id', err);
        });
    }

    public async fetchPhotosByUser(
        name: string,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        return await this.unsplash.users
            .getPhotos({
                username: name,
                page: this.defaultPageNumber,
                perPage: this.defaultPageSize,
            })
            .catch((err) => {
                console.error('Failed to fetch images by user', err);
            });
    }

    public async fetchPhotosByTopic(
        topic: string,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        return await this.unsplash.topics
            .getPhotos({
                topicIdOrSlug: topic,
                page: this.defaultPageNumber,
                perPage: this.defaultPageSize,
            })
            .catch((err) => {
                console.error('Failed to fetch images by topic', err);
            });
    }

    public async fetchPhotos(): Promise<void | ApiResponse<{
        results: Basic[];
        total: number;
    }>> {
        return await this.unsplash.photos
            .list({
                page: this.defaultPageNumber,
                perPage: this.defaultPageSize,
            })
            .catch((err) => {
                console.error('Failed to fetch images', err);
            });
    }

    public async fetchPhotosBySearch(
        keyword: string,
    ): Promise<void | ApiResponse<{ results: Basic[]; total: number }>> {
        return await this.unsplash.search
            .getPhotos({
                query: keyword,
                page: this.defaultPageNumber,
                perPage: this.defaultPageSize,
            })
            .catch((err) => {
                console.error('Failed to fetch searched images', err);
            });
    }
}
