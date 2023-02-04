import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FloatingFooter } from './index';
import { IActionButton } from 'src/types/app';

export default {
  title: 'Components/FloatingFooter',
  component: FloatingFooter,
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof FloatingFooter>;

const CouplebuttonList: IActionButton[] = [
  {
    text: '保存',
    color: 'default',
  },
  {
    text: '提交',
    color: 'primary',
  },
];

const SinglebuttonList: IActionButton[] = [CouplebuttonList[1]];

const Template: ComponentStory<typeof FloatingFooter> = (args) => <FloatingFooter {...args} />;

export const Couple = Template.bind({});

Couple.args = {
  buttonList: CouplebuttonList,
};

export const Single = Template.bind({});

Single.args = {
  buttonList: SinglebuttonList,
};
