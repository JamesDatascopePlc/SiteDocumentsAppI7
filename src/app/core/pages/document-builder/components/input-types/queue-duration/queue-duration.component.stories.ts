import { Meta, StoryFn } from "@storybook/angular";
import { QueueDurationComponent } from "./queue-duration.component";

export default {
  title: "Pages/Document-Builder/Input-Types/Queue-Duration",
  component: QueueDurationComponent,
  argTypes: {}
} as Meta;

const Template: StoryFn<QueueDurationComponent> = (args: QueueDurationComponent) => ({
  props: args
});

export const Default = Template.bind({});