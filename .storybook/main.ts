module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  core: {
    builder: 'webpack5'
  },
  docs: {
    autodocs: 'tag'
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: async (config) => {
    // Remove the default SVG rule Webpack. Once it is filtered out, `@svgr/webpack` takes over
    // See: https://github.com/gregberge/svgr/issues/514
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test('.svg'));

    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true
          }
        }
      ]
    });

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     '@svgr/webpack',
    //     {
    //       loader: 'svgo-loader',
    //       options: {
    //         icon: true,
    //         js2svg: {
    //           indent: 2,
    //           pretty: true
    //         },
    //         multipass: true,
    //         plugins: [
    //           {
    //             name: 'preset-default',
    //             params: {
    //               overrides: {
    //                 /**
    //                  * viewBox is required to resize SVGs with CSS.
    //                  *
    //                  * @see
    //                  * - https://github.com/svg/svgo#svg-wont-scale-when-css-is-applied-on-it
    //                  * - https://github.com/svg/svgo/issues/1128
    //                  */
    //                 removeViewBox: false
    //               }
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   ]
    // });

    return config;
  }
};
