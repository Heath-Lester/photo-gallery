import { Link } from '@nextui-org/react';
import React from 'react';

export default function UnsplashModal({ children }: { children: React.ReactNode }): React.ReactNode {
    console.warn('UNSPLASH MODAL ACTIVATED: ', !!children);
    return (
        <dialog className='flex shadow-lg fixed justify-self-center self-center z-40 rounded-lg backdrop-blur'>
            <Link href='/' />
            {children}
        </dialog>
    );
}
