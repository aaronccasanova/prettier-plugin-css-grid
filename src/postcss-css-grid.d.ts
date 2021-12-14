declare module 'postcss-css-grid' {
  interface PostcssGridOptions {
    singleQuote: boolean
    useTabs: boolean
    tabWidth: number
  }

  // eslint-disable-next-line no-unused-vars
  declare function postcssGrid(options: PostcssGridOptions): any

  export default postcssGrid
}
