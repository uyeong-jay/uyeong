import { ComponentStory, ComponentMeta } from '@storybook/react';
import JoinButton from './JoinButton';

export default {
  title: 'Atoms/JoinButton',
  component: JoinButton,
} as ComponentMeta<typeof JoinButton>;

const Template: ComponentStory<typeof JoinButton> = (args) => <JoinButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'Join',
};
