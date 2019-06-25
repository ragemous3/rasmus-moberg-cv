const _ = require('lodash')

module.exports = function({ addUtilities, e, theme, variants }) {
  const gradients = theme('gradients', {})
  const gradientVariants = variants('gradients', [])

  const utilities = _.map(gradients, ([pos, start, end], name) => ({
    [`.bg-grad-${e(name)}`]: {
      backgroundImage: `linear-gradient(${pos}, ${start}, ${end})`
    }
  }))

  addUtilities(utilities, gradientVariants)
}
//linear-gradient(to top, #e2a6d1 0%, #7fa6e6 100%);
