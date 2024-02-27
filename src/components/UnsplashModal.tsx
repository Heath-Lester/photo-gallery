'use client';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function UnsplashModal({
    children,
    returnPath,
}: {
    children: React.ReactNode;
    returnPath: string;
}): React.ReactNode | null {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    const handleClose = () => {
        onClose();
        router.back();
    };

    // <Modal isOpen={isOpen} onClose={handleClose} placement='center' backdrop='blur' size='5xl'>
    //     <ModalContent>{(onClose) => <ModalBody>{children}</ModalBody>}</ModalContent>
    // </Modal>
    return (
        <div
            onClick={handleClose}
            className='flex justify-center items-center content-center w-full h-full fixed top-0 left-0 z-30 backdrop-blur-sm'
        >
            <dialog className='flex shadow-2xl z-50 rounded-lg'>{children}</dialog>
        </div>
    );
}
