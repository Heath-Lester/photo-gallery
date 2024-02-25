import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

export type UnsplashSearchParams = {
    searchType: UnsplashSearchTypes;
    term: string;
};
