import { StorybookMeta } from ".storybook/storybook.typings";
import { TemplateMenuModal } from "./template-menu.modal";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Modals/Template-Menu",
  component: TemplateMenuModal,
  argTypes: {
    isOpen: { control: "boolean" }
  }
} as StorybookMeta<TemplateMenuModal>;

const Template: StoryFn<TemplateMenuModal> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isOpen: true
}