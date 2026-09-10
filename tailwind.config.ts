import type { Config } from 'tailwindcss';

/**
 * Two colours, used for what they mean: heat is orange, water is blue. Orange
 * marks the hot side of the loop, the heat revenue line, the primary action.
 * Blue marks the return loop, compute, anything cool and running. Everything
 * else is warm paper and ink — the site should read like a printed prospectus,
 * not a dashboard.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // Squared off. Pills and 24px corners are the first thing that makes a site
    // look like every other site.
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '3px',
      md: '4px',
      lg: '6px',
      xl: '8px',
      '2xl': '10px',
      '3xl': '12px',
      full: '9999px',
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f5f1ea',
          2: '#ece6db',
          3: '#e2dbcd',
        },
        card: '#fbf9f5',
        line: {
          DEFAULT: '#d8cfc0',
          strong: '#b6aa96',
        },
        ink: {
          DEFAULT: '#1b1a17',
          soft: '#3d3a35',
          muted: '#6b665e',
          faint: '#958f85',
        },
        heat: {
          50: '#fdf4ec',
          100: '#fbe5d2',
          200: '#f6c8a4',
          300: '#efa26d',
          400: '#e67c3c',
          500: '#d9621f',
          600: '#b95016',
          700: '#933f13',
          800: '#713211',
          900: '#52250d',
        },
        water: {
          50: '#eff5f8',
          100: '#d9e7ee',
          200: '#b6cfdc',
          300: '#86afc5',
          400: '#5a8dab',
          500: '#3a7292',
          600: '#2c5b78',
          700: '#254a61',
          800: '#1f3b4d',
          900: '#172c3a',
        },
        night: {
          700: '#22333f',
          800: '#182530',
          900: '#121c24',
          950: '#0e161c',
        },
        alert: '#b3382b',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Mono labels: small, spaced, uppercase.
        label: ['0.68rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        page: '1280px',
        prose: '44rem',
      },
      boxShadow: {
        // The one shadow on the site: the open menu panel.
        menu: '0 18px 40px -24px rgba(27,26,23,.35)',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flow: {
          '0%': { strokeDashoffset: '48' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        rise: 'rise .22s ease-out both',
        flow: 'flow 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
