import { Spinner } from '@nextui-org/react';

export default function ModalPlaceholder(): React.ReactNode {
    return (
        <div className='m-40 fade-in-fast transform'>
            <Spinner label='Loading...' size='lg'></Spinner>
        </div>
    );
}
