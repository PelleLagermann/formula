const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./styles/*.scss"),
        path.resolve(__dirname, "./../../src/assets/styles/generic/_variables.scss"),
        path.resolve(__dirname, "./../../src/assets/styles/mixins/_mixins.scss")
      ]
    });
}

module.exports = {
    alias: {
      '@': path.resolve(__dirname, '../../src/')
    },

    chainWebpack: config => {
      const types = ["vue-modules", "vue", "normal-modules", "normal"];
      types.forEach(type =>
        addStyleResource(config.module.rule("scss").oneOf(type))
      );
    },

    configureWebpack: {
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "./../../src/assets/icons/"),
            to: path.join(__dirname, 'dist/assets/icon-demo'),
            toType: 'dir',
            ignore: ['.DS_Store']
          }
        ])
      ]
    },

    locales: {
      '/': {
        lang: 'en-US',
        title: 'Alka Vue-Components Library 🥂',
        description: 'Documentation site for the Alka Vue-Components library plugin'
      }
    },

    themeConfig: {
      repoLabel: 'Contribute!',
      // git repo here... gitlab, github
      // repo: 'http://tfs.alkait.net:8080/tfs/defaultcollection/_versionControl?path=%24%2FMinSys%2FJavascript%2FAlka.Vue.Components',
      docsDir: 'docs',
      editLinks: true,
      docsBranch: 'dev',
      // editLinkText: 'Help us improve this page!',
      search: false,
      locales: {
        '/': {
          label: 'English',
          selectText: 'Languages',
          lastUpdated: 'Last Updated',
          // service worker is configured but will only register in production
          serviceWorker: {
            updatePopup: {
              message: 'New content is available.',
              buttonText: 'Refresh'
            }
          },
          nav: [
            { text: 'Getting Started', link: '/guide' },
            { text: 'Components', link: '/components/' },
            // external link to git repo...again
            { text: 'Contribute on TFS', link: 'http://tfs.alkait.net:8080/tfs/defaultcollection/_versionControl?path=%24%2FMinSys%2FJavascript%2FAlka.Vue.Components' }
          ],
          sidebar: {
            '/components/': [
              {
                title: 'Basic Components',
                collapsable: false,
                children: [
                  'basic/card',
                  'basic/click-zone',
                  'basic/custom-checkbox',
                  'basic/custom-input',
                  'basic/custom-radio',
                  'basic/custom-table',
                  'basic/custom-textarea',
                  'basic/flow',
                  'basic/modal',
                  'basic/preloader',
                  'basic/snackbar'
                ]
              },
              {
                title: 'Icon Fonts',
                collapsable: true,
                children: [
                  'fonts/alka-icon'
                ]
              },
              {
                title: 'DEPRECATED: Standard Elements',
                collapsable: true,
                children: [
                  'deprecated/buttons',
                  'deprecated/inputs'
                ]
              }
            ]
          }
        }
      }
    }
  }
