import { Modal } from '@nextui-org/react';
import UnsplashImage from './UnsplashImage';
import GalleryPlaceholder from './GalleryPlaceholder';
import { Suspense } from 'react';

export default function UnsplashModal({ id }: { id: string }): React.ReactNode {
    return (
        <Modal>
            <Suspense fallback={<GalleryPlaceholder displayText='Loading...' />}>
                <UnsplashImage id={id} />
            </Suspense>
        </Modal>
    );
}
