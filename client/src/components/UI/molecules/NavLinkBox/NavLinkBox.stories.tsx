import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLinkBox from './NavLinkBox';

export default {
  title: 'molecules/NavLinkBox',
  components: NavLinkBox,
} as ComponentMeta<typeof NavLinkBox>;

const Template: ComponentStory<typeof NavLinkBox> = (args) => <NavLinkBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'link',
};
