'use client';

import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';

export default function ThemeToggleAlt() {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const lightButton: JSX.Element = (
        <Button
            isIconOnly
            radius='full'
            size='md'
            variant='light'
            aria-label='light mode'
            value='light'
            onClick={(e) => setTheme(e.currentTarget.value)}
        >
            <FiSun />
        </Button>
    );

    const darkButton: JSX.Element = (
        <Button
            isIconOnly
            radius='full'
            size='md'
            variant='light'
            aria-label='dark mode'
            value='dark'
            onClick={(e) => setTheme(e.currentTarget.value)}
        >
            <IoMoon />
        </Button>
    );

    if (mounted) {
        return theme === 'light' ? darkButton : lightButton;
    }
}
