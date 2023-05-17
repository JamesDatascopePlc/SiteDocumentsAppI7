import { StorybookMeta } from ".storybook/storybook.typings";
import { TimePickerComponent } from "./time-picker.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Shared/Time",
  component: TimePickerComponent,
  argTypes: {
    time: { control: "date" },
    timeChange: { action: "timeChange" }
  }
} as StorybookMeta<TimePickerComponent>;

const Template: StoryFn<TimePickerComponent> = args => ({
  props: args
})

export const Default = Template.bind({});