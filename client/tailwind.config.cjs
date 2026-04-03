/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores de la región fronteriza (Doc 2, Sec 4)
      colors: {
        primary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2D5016', // Verde Bosque - Color principal (Naturaleza del Barú)
          900: '#1B5E20',
        },
        secondary: {
          50: '#EFEBE9',
          100: '#D7CCC8',
          200: '#BCAAA4',
          300: '#A1887F',
          400: '#8D6E63',
          500: '#795548',
          600: '#6D4C41',
          700: '#5D4037',
          800: '#8B4513', // Café Tierra - Color secundario (Cultura y tierra)
          900: '#3E2723',
        },
        accent: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#0077BE', // Azul Agua - Color de acento (Ríos y costas)
          900: '#0D47A1',
        },
        status: {
          verified: '#10B981',    // Verde - Verificado (Doc 3, Sec 5.1.4)
          pending: '#F59E0B',     // Amarillo - Pendiente
          rejected: '#EF4444',    // Rojo - Rechazado
          draft: '#6B7280',       // Gris - Borrador
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },

      // Tipografías (Doc 2, Sec 4)
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },

      // Breakpoints responsive (Doc 1, Req 54 - Mobile First)
      screens: {
        'sm': '640px',   // Móvil grande
        'md': '768px',   // Tableta
        'lg': '1024px',  // Escritorio pequeño
        'xl': '1280px',  // Escritorio grande
        '2xl': '1536px', // Pantallas grandes
      },

      // Espaciado adicional
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Border radius personalizado
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },

      // Box shadow personalizado
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [
    // Plugin opcional para forms (formularios más bonitos)
    require('@tailwindcss/forms'),
  ],
}