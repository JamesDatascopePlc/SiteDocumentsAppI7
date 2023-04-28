import { StoryFn } from "@storybook/angular";
import { QueueDurationComponent } from "./queue-duration.component";
import { StorybookMeta } from ".storybook/storybook.typings";

export default {
  title: "Pages/Document-Builder/Input-Types/Queue-Duration",
  component: QueueDurationComponent,
  argTypes: {
    duration: { type: "number" },
    durationChange: { action: "durationChange" },
    type: { control: "select", options: ["Mins", "Hours", "Days"] },
    typeChange: { action: "typeChange" }
  }
} as StorybookMeta<QueueDurationComponent>;

const Template: StoryFn<QueueDurationComponent> = (args: QueueDurationComponent) => ({
  props: args
});

export const Default = Template.bind({});