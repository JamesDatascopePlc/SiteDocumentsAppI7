import { Prefix } from "src/app/shared/types";
import { CascadeSelectTextComponent } from "./cascade-select-text.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = CascadeSelectTextComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/30-Cascade-Select-Text",
  component: CascadeSelectTextComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.CommentsText": { name: "CommentsText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.AnswerOptions": { name: "AnswerOptions", control: "object" },
    "question.CascadeOptions": { name: "CascadeOptions", control: "object" },
    "question.CanHaveImg": { name: "CanHaveImg", control: "boolean" },
    "question.CanHaveFiles": { name: "CanHaveFiles", control: "boolean" }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      CommentsText: args["question.CommentsText"],
      Required: args["question.Required"],
      AnswerOptions: args["question.AnswerOptions"],
      CascadeOptions: args["question.CascadeOptions"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Select a colour and letter",
  "question.CommentsText": "Additional Comments",
  "question.Required": true,
  "question.AnswerOptions": [
    { Val: "0", Text: "Red", MetaData: { ColourHex: "#ff0000" } },
    { Val: "1", Text: "Blue", MetaData: { ColourHex: "#0000ff" } },
    { Val: "2", Text: "Green", MetaData: { ColourHex: "#009933" } },
    { Val: "3", Text: "Yellow", MetaData: { ColourHex: "#ffff00" } },
    { Val: "4", Text: "Orange", MetaData: { ColourHex: "#ff9900" } }
  ],
  "question.CascadeOptions": [
    { Val: "A", Text: "A", ParentVal: "0" },
    { Val: "B", Text: "B", ParentVal: "0" },
    { Val: "C", Text: "C", ParentVal: "1" },
    { Val: "D", Text: "D", ParentVal: "1" },
    { Val: "E", Text: "E", ParentVal: "2" },
    { Val: "F", Text: "F", ParentVal: "2" },
    { Val: "G", Text: "G", ParentVal: "3" },
    { Val: "H", Text: "H", ParentVal: "3" },
    { Val: "I", Text: "I", ParentVal: "4" },
    { Val: "J", Text: "J", ParentVal: "4" }
  ],
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true
}