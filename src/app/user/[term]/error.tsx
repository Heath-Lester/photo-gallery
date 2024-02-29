'use client';

import { ReactNode } from 'react';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';

export default function Error(): ReactNode {
    return <GalleryPlaceholder displayText='An unexpected error occurred.' />;
}
