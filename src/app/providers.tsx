'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute='class' defaultTheme='dark'>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
