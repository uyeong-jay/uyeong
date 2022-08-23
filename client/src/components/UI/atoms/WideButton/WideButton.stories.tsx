import { ComponentStory, ComponentMeta } from '@storybook/react';
import WideButton from './WideButton';

export default {
  title: 'Atoms/Button',
  component: WideButton,
} as ComponentMeta<typeof WideButton>;

//args를 사용하는 이유
// - It allows Storybook and its addons to live edit components. You do not need to modify your underlying component code to use args.
// - addon 중 controls 기능을 사용가능하게 하여 storybook 안에서 변경하며 테스트해보는게 가능
const Template: ComponentStory<typeof WideButton> = (args) => <WideButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: 'button',
  text: 'button',
};
