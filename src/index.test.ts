/**
 * Note: Tests are intentionally minimal as extensive testing
 * is done in the `format-css-grid` package:
 * https://github.com/aaronccasanova/format-css-grid/blob/main/src/grid-template-areas.test.ts
 */

import prettier from 'prettier'
import prettierCssGrid from './index'

function assert(name: string, actual: string, expected: string, options = {}) {
  it(name, () => {
    const formatted = prettier.format(actual, {
      parser: 'css',
      plugins: [prettierCssGrid],
      ...options,
    })

    expect(formatted.trim()).toBe(expected.trim())
  })
}

assert(
  'Basic alignment',
  `
.test {
  grid-template-areas: "a b"
                       "c d";
}`,
  `
.test {
  grid-template-areas:
    "a b"
    "c d";
}`,
)

assert(
  'Format rows and columns',
  `
.test {
  grid-template-areas: "aa b"
                       "c dd";
}`,
  `
.test {
  grid-template-areas:
    "aa b "
    "c  dd";
}`,
)

assert(
  'Add null cell tokens',
  `
.test {
  grid-template-areas:
      "a b c"
      "d e"
      "f";
}`,
  `
.test {
  grid-template-areas:
    "a b c"
    "d e ."
    "f . .";
}`,
)

assert(
  'Persist and format comments',
  `
.test {
  grid-template-areas:
    /* comment */
    "a b"
    /* comment */ "c d" /* comment */
    "e f";
}`,
  `
.test {
  grid-template-areas:
    /* comment */
    "a b"
    /* comment */
    "c d"
    /* comment */
    "e f";
}`,
)

assert(
  'Apply prettier options',
  `
.test {
  grid-template-areas:
    "a b"
    "c d";
}`,
  `
.test {
  grid-template-areas:
    'a b'
    'c d';
}`,
  {
    singleQuote: true,
  },
)
