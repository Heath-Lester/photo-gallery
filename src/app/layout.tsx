import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Paginator from '@/components/Paginator';
import NavBar from '@/components/NavBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description: 'Coding Assessment for MicroHealth',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
    return (
        <html lang='en'>
            <body className={`${inter.className}`}>
                <Providers>
                    <NavBar />
                    <main className='view-span'>{children}</main>
                    <Paginator />
                </Providers>
            </body>
        </html>
    );
}
