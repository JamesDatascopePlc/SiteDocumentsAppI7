import { defaultQuestion } from ".storybook/default";
import { Meta, StoryFn } from "@storybook/angular";
import { QuestionType } from "src/app/core/stores/site-document/site-document.store";
import { RadioGroupTextboxComponent } from "./radio-group-textbox.component";

export default {
  title: "Pages/Document-Builder/Question-Types/07-Radio-Group-Textbox",
  component: RadioGroupTextboxComponent,
  argTypes: {
    question: { control: "object" },
    section: { control: "object" }
  }
} as Meta;

const Template: StoryFn<RadioGroupTextboxComponent> = (args: RadioGroupTextboxComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Radio Group Question with textbox"
  },
  section: {
    SectionID: 1,
    SectionNo: 1,
    SectionQuestiontype: QuestionType.RadioGroup,
    SectionTitle: "",
    IsRepeatable: false,
    Questions: [],
    TableTitles: ["Yes", "No", "N/A"]
  }
}