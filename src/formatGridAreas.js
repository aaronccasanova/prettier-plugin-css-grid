const valueParser = require('postcss-value-parser')

/**
 * @typedef {Object} FormatGridAreasOptions
 * @property {string} value
 * @property {number} startIndex
 * @property {string} quote
 * @property {string} tab
 */

/**
 * @param {FormatGridAreasOptions} options
 * @returns {string}
 */
function formatGridAreas({ value, startIndex, quote, tab }) {
  /** @type {string[]} */
  const gridAreaRows = []

  valueParser(value).walk((node) => {
    if (node.type === 'string') gridAreaRows.push(node.value)
  })

  const normalizedGridAreas = gridAreaRows.map((row) => row.trim().split(/\s+/))

  /** Longest row length is used to fill empty cells in the grid */
  let longestRowLength = 0

  /**
   * List of the longest named cell token in each column
   * @type {number[]}
   */
  const longestTokens = []

  normalizedGridAreas.forEach((row) => {
    if (row.length > longestRowLength) {
      longestRowLength = row.length
    }

    row.forEach((token, i) => {
      if (!longestTokens[i] || token.length > longestTokens[i]) {
        longestTokens[i] = token.length
      }
    })
  })

  /** Starting indent for the declaration */
  const indent = ' '.repeat(startIndex)

  /** @type {string[]} */
  const formattedGridAreaRows = []

  for (let y = 0; y < normalizedGridAreas.length; y++) {
    formattedGridAreaRows[y] = ''

    for (let x = 0; x < longestRowLength; x++) {
      // Add null cell token if current column value is empty
      const token = normalizedGridAreas[y][x] || '.'

      formattedGridAreaRows[y] +=
        // Add an indent and start quote to the first token
        // otherwise add a space to separate each column
        (x === 0 ? indent + `${tab}${quote}` : ' ') +
        // Add end padding based on the longest token in the current column
        token.padEnd(longestTokens[x], ' ') +
        // Add ending quote to the last token
        (x === longestRowLength - 1 ? quote : '')
    }
  }

  return indent + '\n' + formattedGridAreaRows.join('\n')
}

module.exports = formatGridAreas
