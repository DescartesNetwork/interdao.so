const CracoLessPlugin = require('./plugins/craco-less')
const CracoModuleFederation = require('./plugins/craco-module-federation')
const CracoBuffer = require('./plugins/craco-buffer')
const CracoSilence = require('./plugins/craco-silence')
const theme = require('./src/static/styles/theme.js')

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoBuffer,
    },
    {
      plugin: CracoSilence,
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // React Refresh
      // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/394#issuecomment-877708732
      // The bug is examined by people, please follow the link for updates

      // Fix fully specified
      // https://github.com/webpack/webpack/issues/11467#issuecomment-808618999/
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      })
      return webpackConfig
    },
  },
}
