import prettier from 'prettier/parser-postcss'

import postcss, { Syntax } from 'postcss'
import postcssScss from 'postcss-scss'
import postcssLess from 'postcss-less'
import postcssGrid from 'postcss-css-grid'

type Lang = keyof typeof prettier.parsers

const syntaxes: Record<Lang, Syntax> = {
  css: postcss,
  scss: postcssScss,
  less: postcssLess,
}

function getParser(lang: Lang) {
  const prettierParser = prettier.parsers[lang]

  const parser: typeof prettierParser = {
    ...prettierParser,
    preprocess: (text, options) => {
      const root = postcss([
        postcssGrid({
          singleQuote: options.singleQuote,
          useTabs: options.useTabs,
          tabWidth: options.tabWidth,
        }),
      ])
        .process(text, { syntax: syntaxes[lang] })
        .toString()

      return root
    },
  }

  return parser
}

export default {
  name: 'prettier-plugin-css-grid',
  parsers: {
    css: getParser('css'),
    scss: getParser('scss'),
    less: getParser('less'),
  },
}
