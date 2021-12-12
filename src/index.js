const getParser = require('./parser')

module.exports = {
  name: 'prettier-plugin-css-grid',
  parsers: {
    css: getParser('css'),
    scss: getParser('scss'),
    less: getParser('less'),
  },
}
