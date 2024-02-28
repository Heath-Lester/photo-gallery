'use client';

import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import React from 'react';

export default function Error(): React.ReactNode {
    console.error('Keyword path error');
    return <GalleryPlaceholder displayText='An error occurred' />;
}
