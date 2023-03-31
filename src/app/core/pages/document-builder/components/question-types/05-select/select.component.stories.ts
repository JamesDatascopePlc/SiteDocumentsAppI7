import { StoryFn } from "@storybook/angular";
import { SelectComponent } from "./select.component";

export default {
  title: "Pages/Document-Builder/Question-Types/05-Select",
  component: SelectComponent,
  argTypes: {
    question: { control: "object" }
  }
}

const Template: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    QuestionID: 1,
    QuestionText: "Select an item",
    CascadeOptionsText: "",
    Required: false,
    Assets: [],
    Operatives: [],
    CanHaveImg: true,
    CanHaveFiles: true,
    AnswerText: ""
  }
}