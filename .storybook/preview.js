import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    // defaultViewport: 'iphone8p',
  },
  backgrounds: {
    default: 'gray',
    values: [
      {
        name: 'gray',
        value: '#fafafa',
      },
      {
        name: 'white',
        value: '#fffff',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
