import { ComponentStory, ComponentMeta } from '@storybook/react';
import DetailButton from './DetailButton';

export default {
  title: 'molecules/DetailButton',
  component: DetailButton,
} as ComponentMeta<typeof DetailButton>;

const Template: ComponentStory<typeof DetailButton> = (args) => <DetailButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'See more',
};
