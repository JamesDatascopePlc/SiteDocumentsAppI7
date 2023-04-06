import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { SignatureComponent } from "./signature.component";
import { defaultQuestion } from ".storybook/default";

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
    ...defaultQuestion,
    QuestionText: "Sign Here",
  }
}