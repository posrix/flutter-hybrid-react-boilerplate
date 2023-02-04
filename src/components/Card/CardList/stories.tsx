import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardList, { WRAPPER_ID } from '.';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../../AppView';
import { CARDS } from 'src/config/mock';
import { Button } from 'antd-mobile';

export default {
  title: 'Components/CardList',
  component: CardList,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <div id={WRAPPER_ID}>
            <Story />
          </div>
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = (args) => <CardList {...args} />;

export const Default = Template.bind({});

export const ShowEntryButton = Template.bind({});

Default.args = {
  enableSelect: true,
  cards: CARDS,
  renderCardAction: () => <Button>提交</Button>,
  renderSelectAllAction: (ids) => (
    <>
      <Button
        color="primary"
        fill="outline"
        onClick={() => {
          console.debug('[storybook]', ids);
        }}
      >
        批量拒绝
      </Button>
      <Button
        color="primary"
        fill="solid"
        style={{ marginLeft: 12 }}
        onClick={() => {
          console.debug('[storybook]', ids);
        }}
      >
        批量通过
      </Button>
    </>
  ),
};

ShowEntryButton.args = {
  showEntryButton: true,
  cards: CARDS,
};
