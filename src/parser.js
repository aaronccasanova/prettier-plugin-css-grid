const prettier = require('prettier/parser-postcss')

const postcss = require('postcss')
const postcssScss = require('postcss-scss')
const postcssLess = require('postcss-less')
const postcssGrid = require('postcss-css-grid')

const syntaxes = {
  css: postcss,
  scss: postcssScss,
  less: postcssLess,
}

function getParser(lang) {
  const prettierParser = prettier.parsers[lang]

  return {
    ...prettierParser,
    preprocess: (text, options) =>
      postcss([
        postcssGrid({
          singleQuote: options.singleQuote,
          useTabs: options.useTabs,
          tabWidth: options.tabWidth,
        }),
      ])
        .process(text, { syntax: syntaxes[lang] })
        .toString(),
  }
}

module.exports = getParser
