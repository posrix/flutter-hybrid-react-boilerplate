import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import { Button } from 'antd-mobile';
import TextareaModal from '.';
import { useAppDispatch } from 'src/store/hooks';
import { activateTextareaModal } from 'src/store/appSlice';

export default {
  title: 'Components/TextareaModal',
  component: TextareaModal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TextareaModal>;

const Template: ComponentStory<typeof TextareaModal> = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      block
      onClick={() =>
        dispatch(
          activateTextareaModal({
            title: '请输入',
            placeholder: '小于200字',
            handleConfirmCallback: async (text) => {
              return true;
            },
          })
        )
      }
    >
      显示
    </Button>
  );
};

export const Default = Template.bind({});
