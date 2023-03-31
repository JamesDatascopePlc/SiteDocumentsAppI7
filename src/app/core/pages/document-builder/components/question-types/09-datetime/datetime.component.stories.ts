import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { DatetimeComponent } from "./datetime.component";

export default {
  title: "Pages/Document-Builder/Question-Types/09-Datetime",
  component: DatetimeComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<DatetimeComponent> = (args: DatetimeComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Select Date and Time",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}