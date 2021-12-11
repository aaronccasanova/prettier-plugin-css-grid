const getParser = require('./parser')

const languages = [
  {
    name: 'Prettier Plugin CSS Grid - CSS',
    extensions: ['.css'],
    parsers: ['css'],
  },
  {
    name: 'Prettier Plugin CSS Grid - SCSS',
    extensions: ['.scss'],
    parsers: ['scss'],
  },
  {
    name: 'Prettier Plugin CSS Grid - Less',
    extensions: ['.less'],
    parsers: ['less'],
  },
]

const parsers = {
  css: getParser('css'),
  scss: getParser('scss'),
  less: getParser('less'),
}

module.exports = {
  languages,
  parsers,
}
