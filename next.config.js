const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  reactStrictMode: true,
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  }
})
