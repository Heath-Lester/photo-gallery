'use client';

import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';

export default function ThemeToggleAlt(): React.ReactNode | undefined {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <Tooltip
                content={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                delay={500}
                placement='bottom'
                className='text-tiny'
            >
                <Button
                    isIconOnly
                    radius='full'
                    size='md'
                    variant='light'
                    aria-label={theme === 'dark' ? 'dark mode' : 'light mode'}
                    value={theme === 'dark' ? 'light' : 'dark'}
                    onClick={(e) => setTheme(e.currentTarget.value)}
                >
                    {theme === 'dark' ? <FiSun /> : <IoMoon />}
                </Button>
            </Tooltip>
        );
    }
}
