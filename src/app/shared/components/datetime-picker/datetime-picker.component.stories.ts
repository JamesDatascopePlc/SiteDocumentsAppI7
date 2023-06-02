import { IonicModule } from "@ionic/angular";
import { Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { DatetimePickerComponent } from "./datetime-picker.component";

export default {
  title: "Shared/Datetime",
  component: DatetimePickerComponent,
  argTypes: {
    min: { control: "date" },
    max: { control: "date" },
    datetime: { control: "date" },
    presentation: { control: "select", options: ["date", "date-time"] }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
} as Meta;

const Template: StoryFn<DatetimePickerComponent> = (args: DatetimePickerComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  datetime: new Date(),
  presentation: "date-time"
}

export const DateOnly = Template.bind({});

DateOnly.args = {
  datetime: new Date(),
  presentation: "date"
}