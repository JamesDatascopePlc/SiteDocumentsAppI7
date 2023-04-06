import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { RadioTableComponent } from "./radio-table.component";
import { defaultQuestion } from ".storybook/default";

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
    ...defaultQuestion,
    QuestionText: "Radio Group Question"
  }
}