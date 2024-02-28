'use client';

import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }): ReactNode {
    return (
        <NextUIProvider>
            <ThemeProvider attribute='class' defaultTheme='dark'>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
}
