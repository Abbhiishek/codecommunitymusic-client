import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/**/*.mdx'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../next.config.js',
      builder: {
        fsCache: true,
        lazyCompilation: true,
      }
    },
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
    docsMode: true,
  },
};
export default config;
