import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { TextboxComponent } from "./textbox.component";

export default {
  title: "Pages/Document-Builder/Question-Types/03-Textbox",
  component: TextboxComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<TextboxComponent> = (args: TextboxComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Additonal Info",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}