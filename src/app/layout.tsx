import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description: 'Coding Assessment for MicroHealth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <NavBar />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
