// const path = require('path');

// const resolvePath = (_path) => path.join(process.cwd(), _path);

//first yarn add -D tsconfig-paths-webpack-plugin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },

  //https://github.com/storybookjs/storybook/issues/6316 - tsconfig paths가 storybook에 적용되지 않는 에러 해결
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },

  //https://xo.dev/fix-storybook-emotion-11-error/
  //  - emotion 11, storybook 충돌 에러 해결
  //  - storybook6버전에서는 충돌이 안일어나고 있음
  // webpackFinal: async (config) => ({
  //   ...config,
  //   resolve: {
  //     ...config.resolve,
  //     alias: {
  //       ...config.resolve.alias,
  //       '@emotion/core': resolvePath('node_modules/@emotion/react'),
  //       '@emotion/styled': resolvePath('node_modules/@emotion/styled'),
  //       'emotion-theming': resolvePath('node_modules/@emotion/react'),
  //     },
  //   },
  // }),
};
