import { ReactNode } from 'react';
import { Spinner } from '@nextui-org/react';

export default function ModalPlaceholder(): ReactNode {
    return (
        <div className='flex h-[60vh] w-[60vw] fade-in-fast transform items-center justify-center'>
            <Spinner label='Loading...' size='lg'></Spinner>
        </div>
    );
}
