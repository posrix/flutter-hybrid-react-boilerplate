import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '.';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../../AppView';
import { CARDS } from 'src/config/mock';

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <div id="selector-wrapper">
            <Story />
          </div>
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = { ...CARDS[0], preview: true };
