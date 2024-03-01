import { SearchParams } from '@/types/searchParameters';
import { UnsplashSearchTypes } from '@/enums/unsplashSearchTypes';

/**
 * Parameters used to pass API arguments into server side rendered components
 */
export type UnsplashSearchParams = {
    searchType: UnsplashSearchTypes;
} & SearchParams;
