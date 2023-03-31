import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { TextareaComponent } from "./textarea.component";

export default {
  title: "Pages/Document-Builder/Question-Types/04-Textarea",
  component: TextareaComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<TextareaComponent> = (args: TextareaComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Type in some text",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}