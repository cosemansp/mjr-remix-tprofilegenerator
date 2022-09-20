/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    /* add other plugins here */
    require('daisyui'),
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: [
      {
        euricom: {
          primary: '#52abc7',
          'primary-focus': '#a3e0f2',
          'primary-content': '#062a30',
          secondary: '#50696e',
          'secondary-focus': '#72878b',
          'secondary-content': '#e6e9ea',
          accent: '#00ff00',
          'accent-focus': '#bffcb5',
          'accent-content': '#062a30',
          neutral: '#062a30',
          'neutral-focus': '#1e3f44',
          'neutral-content': '#e6e9ea',
          'base-content': '#062a30',
          'base-100': '#fff',
          info: '#a3e0f2',
          success: '#bffcb5',
          warning: '#ffe066',
          error: '#ffa8a8',
        },
      },
    ],
  },
};
