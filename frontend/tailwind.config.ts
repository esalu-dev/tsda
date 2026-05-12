import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'main-red': {
          DEFAULT: '#D0021A',
          50: '#FE8C99',
          100: '#FE7887',
          200: '#FD4F63',
          300: '#FD2740',
          400: '#F8021F',
          500: '#D0021A',
          600: '#A80215',
          700: '#7F0110',
          800: '#57010B',
          900: '#2E0006',
          950: '#1A0003'
        },
        'main-black': {
          DEFAULT: '#0D0D0D',
          50: '#BABABA',
          100: '#B0B0B0',
          200: '#9C9C9C',
          300: '#878787',
          400: '#737373',
          500: '#5F5F5F',
          600: '#4A4A4A',
          700: '#363636',
          800: '#212121',
          900: '#0D0D0D',
          950: '#000000'
        },
        'main-white': {
          DEFAULT: '#EFF2F7'
        },
        'dark-black': {
          DEFAULT: '#141414',
          50: '#ADADAD',
          100: '#A3A3A3',
          200: '#8E8E8E',
          300: '#7A7A7A',
          400: '#666666',
          500: '#515151',
          600: '#3D3D3D',
          700: '#282828',
          800: '#141414',
          900: '#000000',
          950: '#000000'
        },
        'light-black': {
          DEFAULT: '#1E1E1E',
          50: '#B7B7B7',
          100: '#ADADAD',
          200: '#989898',
          300: '#848484',
          400: '#707070',
          500: '#5B5B5B',
          600: '#474747',
          700: '#323232',
          800: '#1E1E1E',
          900: '#020202',
          950: '#000000'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#D0021A',
              50: '#FE8C99',
              100: '#FE7887',
              200: '#FD4F63',
              300: '#FD2740',
              400: '#F8021F',
              500: '#D0021A',
              600: '#A80215',
              700: '#7F0110',
              800: '#57010B',
              900: '#2E0006'
            },
            danger: {
              DEFAULT: '#F28123',
              50: '#FCE4D0',
              100: '#FBD9BD',
              200: '#F9C397',
              300: '#F7AD70',
              400: '#F4974A',
              500: '#F28123',
              600: '#D1650C',
              700: '#9C4C09',
              800: '#673206',
              900: '#321803'
            }
          }
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#D0021A',
              50: '#FE8C99',
              100: '#FE7887',
              200: '#FD4F63',
              300: '#FD2740',
              400: '#F8021F',
              500: '#D0021A',
              600: '#A80215',
              700: '#7F0110',
              800: '#57010B',
              900: '#2E0006'
            },
            danger: {
              DEFAULT: '#F28123',
              50: '#FCE4D0',
              100: '#FBD9BD',
              200: '#F9C397',
              300: '#F7AD70',
              400: '#F4974A',
              500: '#F28123',
              600: '#D1650C',
              700: '#9C4C09',
              800: '#673206',
              900: '#321803'
            }
          }
        }
      }
    })
  ]
}
export default config
