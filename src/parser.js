const prettier = require('prettier/parser-postcss')

const postcss = require('postcss')
const postcssScss = require('postcss-scss')
const postcssLess = require('postcss-less')

const formatGridAreas = require('./formatGridAreas')

const postcssParsers = {
  css: postcss,
  scss: postcssScss,
  less: postcssLess,
}

function getParser(lang) {
  const prettierParser = prettier.parsers[lang]

  return {
    ...prettierParser,
    parse: (text, parsers, options) => {
      const root = postcssParsers[lang].parse(text)

      root.walkDecls((decl) => {
        if (decl.prop !== 'grid-template-areas') return

        const gridTemplateAreas = formatGridAreas({
          value: decl.value,
          startIndex: decl.source.start.column,
          quote: options.singleQuote ? `'` : `"`,
          tab: options.useTabs ? '\t' : ' '.repeat(options.tabWidth || 2),
        })

        decl.value = gridTemplateAreas
      })

      const css = root.toString()

      return prettierParser.parse(css, parsers, options)
    },
  }
}

module.exports = getParser
