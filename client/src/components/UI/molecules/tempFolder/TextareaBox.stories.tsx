import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextareaBox from './TextareaBox';

export default {
  title: 'molecules/TextareaBox',
  components: TextareaBox,
} as ComponentMeta<typeof TextareaBox>;

const Template: ComponentStory<typeof TextareaBox> = (args) => <TextareaBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'name',
  labelText: 'labelText',
};
