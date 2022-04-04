module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      minHeight: {
        1: '1rem',
        2: '2rem',
        4: '4rem',
        5: '5rem',
      },
      maxHeight: {
        1: '1rem',
        2: '2rem',
        4: '4rem',
        5: '5rem',
      },
      maxWidth: {
        28: '7rem',
        36: '9rem'
      },
      colors: {
        'warn': '#dc2626',
        'warning': '#dc2626',
        'default': '#cbd5e1',
        'primary': '#2196f3',
        'accent': '#37474f',
      },
      borderRadius: {
        'container': "15px",
        'menu': "5px",
        'button': "30px"
      },
      opacity: {
        12: '0.12',
        38: '0.38',
        87: '0.87'
      },
      spacing: {
        '160': '40rem',
      }
    },
  },
  plugins: [],
}
