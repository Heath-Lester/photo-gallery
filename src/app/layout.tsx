import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import MainHeader from '@/components/MainHeader';
import Modal from '@/components/Modal';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description: 'Coding Assessment for MicroHealth',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <MainHeader />
                    <main>{children}</main>
                    {/* <Suspense fallback={<>Loading...</>}>
                        <Modal />
                    </Suspense> */}
                </Providers>
            </body>
        </html>
    );
}
