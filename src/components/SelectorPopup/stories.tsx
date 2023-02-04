import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import { List } from 'antd-mobile';
import SelectorPopup from '.';
import { useAppDispatch } from 'src/store/hooks';
import { activateSelectorPopup } from 'src/store/appSlice';
import { useState } from 'react';

export default {
  title: 'Components/SelectorPopup',
  component: SelectorPopup,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof SelectorPopup>;

const Template: ComponentStory<typeof SelectorPopup> = () => {
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { name: '选项A', value: 'A' },
    { name: '选项B', value: 'B' },
    { name: '选项C', value: 'C' },
    { name: '选项D', value: 'D' },
  ];
  return (
    <List>
      <List.Item
        extra={
          // @ts-ignore
          selectedOption ? options.find((option) => option.value === selectedOption).name : '请选择'
        }
        onClick={() =>
          dispatch(
            activateSelectorPopup({
              selectorOptions: options,
              selectorValue: options[0].value,
              title: '选择',
              handleSelectCallback: (value) => {
                setSelectedOption(value);
              },
            })
          )
        }
      >
        选项
      </List.Item>
    </List>
  );
};

export const Default = Template.bind({});
