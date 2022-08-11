import { ComponentStory, ComponentMeta } from '@storybook/react';
import MoreButton from './MoreButton';

export default {
  title: 'Atoms/MoreButton',
  component: MoreButton,
} as ComponentMeta<typeof MoreButton>;

const Template: ComponentStory<typeof MoreButton> = (args) => <MoreButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: '더보기',
};
