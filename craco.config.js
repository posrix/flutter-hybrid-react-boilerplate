const path = require('path');
const fs = require('fs');
const CracoAlias = require('craco-alias');
const CracoLessPlugin = require('craco-less');
// const { POSTCSS_MODES } = require('@craco/craco');
const { DefinePlugin } = require('webpack');
const OfflinePackagePlugin = require('./OfflinePackagePlugin.js');

const apiHost = process.env.API_HOST || 'dev';

const proxyConfig = {
  local: {
    '/api': {
      target: 'http://127.0.0.1:8100',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: { '^/api': '' },
    },
  },
};

module.exports = {
  style: {
    postcss: {
      // https://github.com/gsoft-inc/craco/blob/d9b4aae99dd8267311b86ad034f93e5c84040a7d/packages/craco/README.md
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        // postcssLoaderOptions.postcssOptions.plugins =
        //   postcssLoaderOptions.postcssOptions.plugins.concat([['flex-gap-polyfill', {}]]);
        return postcssLoaderOptions;
      },
      mode: 'extends',
    },
  },
  babel: {
    plugins: [
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['react-activation/babel'],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '49',
            ios: '10',
          },
        },
      ],
    ],
  },
  webpack: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
    plugins: [
      new DefinePlugin({
        'process.env.VERSION': JSON.stringify(require('./package.json').version),
        'process.env.WEB': process.env.WEB,
        'process.env.TOKEN':
          process.env.WEB &&
          JSON.stringify(
            fs.readFileSync(path.join(__dirname, './.token'), {
              encoding: 'utf8',
            })
          ),
      }),
      new OfflinePackagePlugin({
        packageName: 'Leadigital Mobile App',
      }),
    ],
    configure: (webpackConfig) => {
      // remove ModuleScopePlugin for importing files outside src folder
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      // Remove sourcemap warning for pinyin
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ];
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    return {
      ...devServerConfig,
      proxy: proxyConfig[apiHost],
    };
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '.',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
          are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
    { plugin: CracoLessPlugin },
  ],
};
