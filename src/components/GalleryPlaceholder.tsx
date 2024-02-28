import { ReactNode } from 'react';

export default function GalleryPlaceholder({ displayText }: { displayText: string }): ReactNode {
    return <div className='mt-24 text-center text-small fade-in-slow'>{displayText}</div>;
}
