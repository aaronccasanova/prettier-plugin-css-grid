import prettier from 'prettier'

function assertStrictEqual(message: string, a: string, b: string) {
  it(message, () => {
    const formatted = prettier.format(a, {
      parser: 'css',
      plugins: ['.'],
    })

    expect(formatted).toBe(b)
  })
}

assertStrictEqual(
  'Assertion 1',
  `
.test {
  grid-template-areas: "a b b"
                       "a c    d";
}`,
  `
.test {
  grid-template-areas:
    "a b b"
    "a c d";
}`,
)

// assertStrictEqual(
//   'Assertion 2',
//   `
// .test {
//   grid-template-areas:
//       "one two two three three three"
//       "two two three three three one"
//       "three three three one two two";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   two   two   three three three"
//     "two   two   three three three one  "
//     "three three three one   two   two  ";
// }`,
// )

// assertStrictEqual(
//   'Assertion 3',
//   `
// .test {
//   grid-template-areas: "one two two three three three"
//                       "two two three three three one"
//                       "three three three one two two";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   two   two   three three three"
//     "two   two   three three three one  "
//     "three three three one   two   two  ";
// }`,
// )

// assertStrictEqual(
//   'Assertion 4',
//   `
// .test {
//   grid-template-areas:
//      "one two two three three three"
//      "two two three three three one"
//      "three three three one two two";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   two   two   three three three"
//     "two   two   three three three one  "
//     "three three three one   two   two  ";
// }`,
// )

// assertStrictEqual(
//   'Assertion 5',
//   `
// .test {
//   grid-template-areas:
//       "one two two three three three"
//       "two two three three three one"
//       "three three three one two two";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   two   two   three three three"
//     "two   two   three three three one  "
//     "three three three one   two   two  ";
// }`,
// )

// assertStrictEqual(
//   'Assertion 6',
//   `
// .test {
//   grid-template-areas:
//   "three three three"
//   "two two"
//   "one";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "three three three"
//     "two   two   .    "
//     "one   .     .    ";
// }`,
// )

// assertStrictEqual(
//   'Assertion 7',
//   `
// .test {
//   grid-template-areas: "one" "two two" "three three three";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   .     .    "
//     "two   two   .    "
//     "three three three";
// }`,
// )

// assertStrictEqual(
//   'Assertion 8 - Single quotes',
//   `
// .test {
//   grid-template-areas:
//   'three three three'
//   'two two'
//   'one';
// }`,
//   `
// .test {
//   grid-template-areas:
//     'three three three'
//     'two   two   .    '
//     'one   .     .    ';
// }`,
// )

// assertStrictEqual(
//   'Assertion 9 - Comments',
//   `
// .test {
//   grid-template-areas:
//     "one two three"
//     /* what if there is a comment */
//     "two three one"
//     /* what if there is a comment */
//     // what about a non valid css comment
//     "three one two";
// }`,
//   `
// .test {
//   grid-template-areas:
//     "one   two   three"
//     "two   three one  "
//     "three one   two  ";
// }`,
// )

// assert.throws(
//   () => prettier.format('/*/*/* x', { parser: 'css', plugins: ['.'] }),
//   'surfaces errors to Prettier',
// )
