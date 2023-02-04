import { ComponentStory, ComponentMeta } from '@storybook/react';
import Timeline from './';

export default {
  title: 'Components/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;

export const Default = Template.bind({});

Default.args = {
  sections: [
    { title: '审批', person: '王五', datetime: '11月15日 12:05', description: '审批通过' },
    { title: '完善', person: '赵武', datetime: '11月15日 13:23', description: '完善' },
    {
      title: '审批',
      person: '王二',
      datetime: '11月15日 14:45',
      description: '审批驳回',
    },
    { title: '提交', person: '王五', datetime: '11月15日 15:25' },
    { title: '开始', person: '王五', datetime: '11月15日 15:25' },
    { title: '创建成功', person: '系统', datetime: '11月15日 15:25' },
  ],
};
