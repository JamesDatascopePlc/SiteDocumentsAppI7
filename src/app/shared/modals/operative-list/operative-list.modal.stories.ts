import { Meta, StoryFn } from "@storybook/angular";
import { OperativeListModal } from "./operative-list.modal";

export default {
  title: "Shared/Modals/Operative-List",
  component: OperativeListModal
} as Meta;

const Template: StoryFn<OperativeListModal> = (args: OperativeListModal) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isOpen: true
}