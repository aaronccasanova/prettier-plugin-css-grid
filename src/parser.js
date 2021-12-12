const prettier = require('prettier/parser-postcss')

const postcss = require('postcss')
const postcssScss = require('postcss-scss')
const postcssLess = require('postcss-less')

const { getGridTemplateAreas } = require('./formatter')

const postcssParsers = {
  css: postcss,
  scss: postcssScss,
  less: postcssLess,
}

function getParser(lang) {
  const prettierParser = prettier.parsers[lang]

  return {
    ...prettierParser,
    preprocess: (text, options) => {
      const root = postcssParsers[lang].parse(text)

      root.walkDecls((decl) => {
        if (decl.prop !== 'grid-template-areas') return

        const gridTemplateAreas = getGridTemplateAreas({
          value: decl.value,
          quote: options.singleQuote ? `'` : `"`,
          startColumn: decl.source.start.column,
          tab: options.useTabs ? '\t' : ' '.repeat(options.tabWidth || 2),
        })

        decl.value = gridTemplateAreas.trim()
      })

      return root.toString()
    },
  }
}

module.exports = getParser
