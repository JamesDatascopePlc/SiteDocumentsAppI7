import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { SignatureComponent } from "./signature.component";

export default {
  title: "Pages/Document-Builder/Question-Types/19-Signature",
  component: SignatureComponent,
  argTypes: {
    question: { control: "object" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<SignatureComponent> = (args: SignatureComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Sign Here",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}