export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#fffdf0',
              100: '#fff9e0',
              200: '#fff3ba',
              300: '#ffeb7d',
              400: '#ffdf38',
              500: '#FFD700',
              600: '#e6c200',
              700: '#ccad00',
              800: '#b39800',
              900: '#998300',
            },
            gray: {
              50: '#f9fafb',
              100: '#f3f4f6',
              200: '#e5e7eb',
              300: '#d1d5db',
              400: '#9ca3af',
              500: '#6b7280',
              600: '#4b5563',
              700: '#374151',
              800: '#1f2937',
              900: '#111827',
            }
          },
          fontFamily: {
            'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
            'sans': ['Inter', 'system-ui', 'sans-serif'],
          },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2s infinite',
          }
        },
      },
      darkMode: 'class',
    },
    autoprefixer: {},
  },
}