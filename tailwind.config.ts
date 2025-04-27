import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'primary-red-90': 'var(--primary-red-90)',
        'primary-red-80': 'var(--primary-red-80)',
        'primary-red-70': 'var(--primary-red-70)',
        'primary-red-60': 'var(--primary-red-60)',
        'primary-red-50': 'var(--primary-red-50)',
        'primary-red-30': 'var(--primary-red-30)',
        'primary-red-10': 'var(--primary-red-10)',

        //Secondary
        'secondary-E6': 'var(--secondary-E6)',
        'secondary-F0': 'var(--secondary-F0)',
        'secondary-F7': 'var(--secondary-F7)',

        //Gray
        'gray-90': 'var(--gray-90)',
        'gray-70': 'var(--gray-70)',
        'gray-50': 'var(--gray-50)',

        //Danger
        'danger-5': 'var(--danger-5)',
        'danger-10': 'var(--danger-10)',
        'danger-20': 'var(--danger-20)',
        'danger-30': 'var(--danger-30)',
        'danger-40': 'var(--danger-40)',
        'danger-50': 'var(--danger-50)',
        'danger-60': 'var(--danger-60)',
        'danger-70': 'var(--danger-70)',
        'danger-80': 'var(--danger-80)',
      },
    },
  },
  plugins: [],
};
export default config;
