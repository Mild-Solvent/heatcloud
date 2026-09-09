import type { Config } from 'tailwindcss';

/**
 * Infomaniak's layout DNA — white ground, generous rounding, one saturated
 * accent — with HeatCloud's warm palette instead of their blue. The two brand
 * colours are the ones already used by the research dossier: ember orange for
 * heat, deep teal for water and compute.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#141a22',
          soft: '#3d4753',
          muted: '#68727e',
          faint: '#98a1ab',
        },
        ember: {
          50: '#fdf5ef',
          100: '#fae7d7',
          200: '#f4cbaa',
          300: '#eda878',
          400: '#e8823f',
          500: '#d96a24',
          600: '#c25e1e',
          700: '#9c4a18',
          800: '#7a3a14',
          900: '#5c2c10',
        },
        teal: {
          50: '#eefaf9',
          100: '#d1f2ef',
          200: '#a3e5df',
          300: '#66d0c8',
          400: '#3fb5b5',
          500: '#1a8f8f',
          600: '#0e6e6e',
          700: '#0c5757',
          800: '#0a4545',
          900: '#083636',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f7f5f0',
          200: '#efe9de',
          300: '#e3ddd2',
          400: '#cfc7b8',
        },
        night: {
          700: '#1b222c',
          800: '#161c24',
          900: '#12161c',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,26,34,.04), 0 10px 30px -12px rgba(20,26,34,.14)',
        lift: '0 2px 6px rgba(20,26,34,.06), 0 24px 48px -20px rgba(20,26,34,.28)',
        menu: '0 24px 60px -20px rgba(20,26,34,.35)',
      },
      maxWidth: {
        page: '1200px',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flow: {
          '0%': { strokeDashoffset: '48' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        rise: 'rise .28s ease-out both',
        flow: 'flow 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
