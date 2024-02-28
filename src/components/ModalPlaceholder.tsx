import { Spinner } from '@nextui-org/react';

export default function ModalPlaceholder(): React.ReactNode {
    return (
        <div className='h-[50vh] w-[50vw] fade-in-fast transform items-center justify-center'>
            <Spinner label='Loading...' size='lg'></Spinner>
        </div>
    );
}
