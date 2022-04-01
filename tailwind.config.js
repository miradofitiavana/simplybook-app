module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      color: {},
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
        'warning': '#dc2626',
        'default': '#cbd5e1'
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
