import { ReactNode } from 'react';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';

export default function Loading(): ReactNode {
    return <GalleryPlaceholder displayText='Loading...' />;
}
