import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import { Button } from 'antd-mobile';
import InputModal from '.';
import { useAppDispatch } from 'src/store/hooks';
import { activateInputModal } from 'src/store/appSlice';

export default {
  title: 'Components/InputModal',
  component: InputModal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof InputModal>;

const Template: ComponentStory<typeof InputModal> = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      block
      onClick={() =>
        dispatch(
          activateInputModal({
            title: '修改字段',
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
