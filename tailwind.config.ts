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
                gallery: 'repeat(auto-fit, minmax(260px, 1fr))',
            },
            minHeight: {
                lgv: 'calc(100vh - 8.6em)',
                smv: 'calc(100vh - 14.6em)',
            },
            screens: {},
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
                    colors: {
                        primary: 'gray',
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        primary: 'gray',
                    },
                },
            },
        }),
    ],
};
export default config;
