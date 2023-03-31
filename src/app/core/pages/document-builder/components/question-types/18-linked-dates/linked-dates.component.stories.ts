import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { LinkedDatesComponent } from "./linked-dates.component";

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
    QuestionID: 1,
    QuestionText: "From Date",
    CascadeOptionsText: "To Date",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}