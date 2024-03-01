import { ReactNode } from 'react';
import GallerySpinner from './GallerySpinner';

export default function ModalPlaceholder(): ReactNode {
    return (
        <div className='flex h-[60vh] w-[50vw] fade-in-fast transform items-center justify-center'>
            <GallerySpinner />
        </div>
    );
}
