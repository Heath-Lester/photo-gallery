import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

export type UnsplashSearchParams = {
    searchType: UnsplashSearchTypes;
    keyword: string;
};
