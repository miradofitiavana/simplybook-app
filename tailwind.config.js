module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}
