import { StoryFn } from "@storybook/angular";
import { SelectComponent } from "./select.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = SelectComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/05-Select",
  component: SelectComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.Options": { name: "Options", control: "object" },
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
      Required: args["question.Required"],
      Options: args["question.Options"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Select a colour",
  "question.Required": true,
  "question.Options": [
    { Val: "0", Text: "Red", MetaData: { ColourHex: "#ff0000" } },
    { Val: "1", Text: "Blue", MetaData: { ColourHex: "#0000ff" } },
    { Val: "2", Text: "Green", MetaData: { ColourHex: "#009933" } },
    { Val: "3", Text: "Yellow", MetaData: { ColourHex: "#ffff00" } },
    { Val: "4", Text: "Orange", MetaData: { ColourHex: "#ff9900" } }
  ],
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true
}