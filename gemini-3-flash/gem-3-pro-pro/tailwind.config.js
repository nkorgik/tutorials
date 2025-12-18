/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--color-bg-main)',
        'bg-sidebar': 'var(--color-bg-sidebar)',
        'bg-chat': 'var(--color-bg-chat)',
        'bubble-sent': 'var(--color-bubble-sent)',
        'bubble-received': 'var(--color-bubble-received)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent': 'var(--color-accent)',
        // No 'border' override to avoid conflict with standard utils, usually, but let's try mapping. 
        // Actually, better to name it specific or just not override 'border' entirely. Use 'custom-border' or similar if needed. 
        // But in variables I have --color-border.
        'custom-border': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      }
    },
  },
  plugins: [],
}
