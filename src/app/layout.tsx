import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import NavBar from '@/components/NavBar';
import React from 'react';
import { ScriptProps } from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description: 'Coding Assessment for MicroHealth',
};

export default function RootLayout(props: { children: React.ReactNode; parallel: React.ReactNode }): React.ReactNode {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <NavBar />
                    <main>
                        {props.children}
                        {props.parallel}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
