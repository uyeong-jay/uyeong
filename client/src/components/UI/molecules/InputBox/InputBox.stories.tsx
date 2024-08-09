import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputBox from './InputBox';

export default {
  title: 'molecules/InputBox',
  component: InputBox,
} as ComponentMeta<typeof InputBox>;

const Template: ComponentStory<typeof InputBox> = (args) => <InputBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'name',
  type: 'text',
  labelText: 'labelText',
};
