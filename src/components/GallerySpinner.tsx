import { Spinner } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function GallerySpinner(): ReactNode {
    return <Spinner label='Loading...' size='lg' className='text-small fade-in-slow' />;
}
