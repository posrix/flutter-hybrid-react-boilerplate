import { ComponentStory, ComponentMeta } from '@storybook/react';
import Calendar from '.';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../../AppView';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Calendar>;

const defaultSingle = new Date('2022-06-27');

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});

Default.args = {
  hideYearButton: true,
  defaultValue: defaultSingle,
  selectionMode: 'single',
  onChange: (val: any) => {
    console.debug('[storybook]', val);
  },
};
