import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{html,js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{html,js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{html,js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{html,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            gridTemplateColumns: {
                gallery: 'repeat(auto-fill, minmax(225px, 1fr))',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            layout: {
                radius: {
                    small: '2px',
                    medium: '4px',
                    large: '8px',
                },
                borderWidth: {
                    small: '1px',
                    medium: '2px',
                    large: '4px',
                },
            },
            themes: {
                light: {
                    layout: {},
                    colors: {},
                },
                dark: {
                    layout: {},
                    colors: {},
                },
            },
        }),
    ],
};
export default config;
