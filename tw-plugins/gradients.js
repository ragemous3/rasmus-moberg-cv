const _ = require('lodash')

module.exports = function({ addUtilities, e, theme, variants }) {
  const gradients = theme('gradients', {})
  const gradientVariants = variants('gradients', [])

  const utilities = _.map(gradients, ([start, end], name) => ({
    [`.bg-grad-${e(name)}`]: {
      backgroundImage: `linear-gradient(to top, ${start}, ${end})`
    }
  }))

  addUtilities(utilities, gradientVariants)
}
