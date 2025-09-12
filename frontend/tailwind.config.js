/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        steam: {
          dark: '#1B1B1B',       // bg
          panel: '#2A2A2A',      // panels
          border: '#3A3A3A',     // frames
          oliveDark: '#3f4639',      // dark olive
          oliveLight: '#4f5746', // light olive
          oliveVeryLight: '#b7b381',
          oliveHover: '#292e22',
          textActive: '#d7ded1',
          textUnactive: '#8e9684',
          textLight: '#8e9684',
          textDark: '#212818',       // text
        }
      }
    },
  },
  plugins: [],
};
