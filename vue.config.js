const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

  // Break build on eslint errors.
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader')
      .tap(opts => ({ ...opts, emitWarning: false }))
  },

  // Add To / Edit - Webpack Config.
  configureWebpack: {
    // Allow for beter debugging.
    devtool: 'source-map',
    // Copy SCSS files in to dist folder.
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/assets/styles'),
          to: path.join(__dirname, 'dist/scss'),
          toType: 'dir',
          ignore: ['.DS_Store']
        },
        {
          from: path.join(__dirname, 'src/assets/icons/style.scss'),
          to: path.join(__dirname, 'dist/scss/objects/icons/style.scss'),
          toType: 'file',
          ignore: ['.DS_Store']
        },
        {
          from: path.join(__dirname, 'src/assets/icons/variables.scss'),
          to: path.join(__dirname, 'dist/scss/objects/icons/variables.scss'),
          toType: 'file',
          ignore: ['.DS_Store']
        },
        {
          from: path.join(__dirname, 'src/assets/icons/fonts'),
          to: path.join(__dirname, 'dist/icons/fonts'),
          toType: 'dir',
          ignore: ['.DS_Store']
        }
      ])
    ]
  },

  // Configure CSS preprocessor.
  css: {
    loaderOptions: {
      sass: {
        // pass options to sass-loader
        // @/ is an alias to src/
        // Note: this option is named as "data" in sass-loader v7
        prependData: `
        @import "@/assets/styles/generic/_variables.scss"
        @import "@/assets/styles/mixins/_mixins.scss"
        `
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `data` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        prependData: `
        @import "@/assets/styles/generic/_variables.scss";
        @import "@/assets/styles/mixins/_mixins.scss";
        `
      }
    }
  }
}
