import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import NavContainer from '@/components/NavContainer';

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
                    <NavContainer>
                        <main id='view-port' className='flex min-h-smv sm:min-h-lgv justify-center overflow-y-auto'>
                            {children}
                        </main>
                    </NavContainer>
                </Providers>
            </body>
        </html>
    );
}
