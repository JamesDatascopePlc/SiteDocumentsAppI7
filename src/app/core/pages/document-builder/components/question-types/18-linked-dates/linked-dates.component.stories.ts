import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { LinkedDatesComponent } from "./linked-dates.component";
import { defaultQuestion } from ".storybook/default";

export default {
  title: "Pages/Document-Builder/Question-Types/18-Linked-Dates",
  component: LinkedDatesComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<LinkedDatesComponent> = (args: LinkedDatesComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionID: 1,
    QuestionText: "From Date",
    CascadeOptionsText: "To Date"
  }
}