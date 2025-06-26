/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Trust-building blue (blue-600)
        'primary-50': '#EFF6FF', // Light blue tint (blue-50)
        'primary-100': '#DBEAFE', // Lighter blue (blue-100)
        'primary-500': '#3B82F6', // Medium blue (blue-500)
        'primary-600': '#2563EB', // Primary blue (blue-600)
        'primary-700': '#1D4ED8', // Darker blue (blue-700)
        
        // Secondary Colors
        'secondary': '#64748B', // Professional slate gray (slate-500)
        'secondary-100': '#F1F5F9', // Light slate (slate-100)
        'secondary-200': '#E2E8F0', // Lighter slate (slate-200)
        'secondary-300': '#CBD5E1', // Light slate (slate-300)
        'secondary-400': '#94A3B8', // Medium light slate (slate-400)
        'secondary-500': '#64748B', // Medium slate (slate-500)
        'secondary-600': '#475569', // Darker slate (slate-600)
        'secondary-700': '#334155', // Dark slate (slate-700)
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber (amber-500)
        'accent-50': '#FFFBEB', // Light amber tint (amber-50)
        'accent-100': '#FEF3C7', // Lighter amber (amber-100)
        'accent-400': '#FBBF24', // Medium light amber (amber-400)
        'accent-500': '#F59E0B', // Primary amber (amber-500)
        'accent-600': '#D97706', // Darker amber (amber-600)
        
        // Background Colors
        'background': '#FAFAFA', // Soft off-white (gray-50)
        'surface': '#FFFFFF', // Pure white (white)
        
        // Text Colors
        'text-primary': '#1E293B', // Deep charcoal (slate-800)
        'text-secondary': '#64748B', // Medium gray (slate-500)
        'text-muted': '#94A3B8', // Light gray (slate-400)
        
        // Status Colors
        'success': '#10B981', // Fresh green (emerald-500)
        'success-50': '#ECFDF5', // Light green tint (emerald-50)
        'success-100': '#D1FAE5', // Lighter green (emerald-100)
        'success-500': '#10B981', // Primary green (emerald-500)
        'success-600': '#059669', // Darker green (emerald-600)
        
        'warning': '#F59E0B', // Consistent amber (amber-500)
        'warning-50': '#FFFBEB', // Light amber tint (amber-50)
        'warning-100': '#FEF3C7', // Lighter amber (amber-100)
        'warning-500': '#F59E0B', // Primary amber (amber-500)
        'warning-600': '#D97706', // Darker amber (amber-600)
        
        'error': '#EF4444', // Clear red (red-500)
        'error-50': '#FEF2F2', // Light red tint (red-50)
        'error-100': '#FEE2E2', // Lighter red (red-100)
        'error-500': '#EF4444', // Primary red (red-500)
        'error-600': '#DC2626', // Darker red (red-600)
        
        // Border Colors
        'border': '#E2E8F0', // Minimal border (slate-200)
        'border-light': '#F1F5F9', // Light border (slate-100)
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'DEFAULT': '6px',
      },
      boxShadow: {
        'product-card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [],
}