import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { RadioTableComponent } from "./radio-table.component";

export default {
  title: "Pages/Document-Builder/Question-Types/02-Radio-Table",
  component: RadioTableComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<RadioTableComponent> = (args: RadioTableComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Radio Group Question",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}