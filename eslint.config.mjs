// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  quotes: ['single'],
  quoteprops: ['avoid-escape', { avoidTemplateLiterals: true }],
})
// Your custom configs here
