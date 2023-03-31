import { Meta, StoryFn } from "@storybook/angular";
import { RegistrationPage } from "./registration.page";

export default {
  title: "Pages/Registration",
  component: RegistrationPage,
  argTypes: {}
} as Meta;

const Template: StoryFn<RegistrationPage> = (args: RegistrationPage) => ({
  props: args
});

export const Default = Template.bind({});