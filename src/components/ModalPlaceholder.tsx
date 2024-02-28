import { Spinner } from '@nextui-org/react';

export default function ModalPlaceholder(): React.ReactNode {
    return (
        <div className='flex h-[80vh] w-[80vw] fade-in-fast transform items-center justify-center'>
            <Spinner label='Loading...' size='lg'></Spinner>
        </div>
    );
}
