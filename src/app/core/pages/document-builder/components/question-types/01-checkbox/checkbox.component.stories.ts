import { IonicModule } from "@ionic/angular";
import { Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";

interface QuestionArgs {
  "question.QuestionText": string,
  "question.Required": boolean
}

export default {
  title: "Pages/Document-Builder/Question-Types/01-Checkbox",
  component: CheckboxComponent,
  argTypes: {
    "question.QuestionText": { control: "text" },
    "question.Required": { control: "boolean" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
} as Meta;

const Template: StoryFn<CheckboxComponent & QuestionArgs> = (args: CheckboxComponent & QuestionArgs) => ({
  props: {
    ...args,
    question: {
      ...args.question,
      QuestionText: args["question.QuestionText"],
      Required: args["question.Required"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Is it vegan-friendly?",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  },
  "question.QuestionText": "Is it vegan-friendly?",
  "question.Required": true
}