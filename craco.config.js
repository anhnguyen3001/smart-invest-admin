module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['src/assets'],
        },
      },
    },
    postcss: {
      plugins: [require('postcss')()],
    },
  },
  webpack: {
    // alias: {
    //   '@src': path.resolve(__dirname, 'src'),
    //   '@assets': path.resolve(__dirname, 'src/@core/assets'),
    //   '@components': path.resolve(__dirname, 'src/@core/components'),
    //   '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
    //   '@store': path.resolve(__dirname, 'src/redux'),
    //   '@styles': path.resolve(__dirname, 'src/@core/scss'),
    //   '@configs': path.resolve(__dirname, 'src/configs'),
    //   '@utils': path.resolve(__dirname, 'src/utility/Utils'),
    //   '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
    //   '@contexts': path.resolve(__dirname, 'src/contexts'),
    // },
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {
          base: {
            chunks: 'all',
            test: /(react|react-dom)/,
            name: 'base',
            priority: 100,
          },
          commons: {
            chunks: 'all',
            minChunks: 2,
            name: 'commons',
            priority: 80,
          },
        },
      };
      return webpackConfig;
    },
  },
};
