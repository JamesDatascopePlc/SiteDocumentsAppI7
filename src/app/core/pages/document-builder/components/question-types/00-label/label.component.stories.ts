import { Prefix } from "src/app/shared/types";
import { LabelComponent } from "./label.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = LabelComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/00-Label",
  component: LabelComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.CanHaveImg": { name: "CanHaveImg", control: "boolean" },
    "question.CanHaveFiles": { name: "CanHaveFiles", control: "boolean" }
  }
} as StorybookMeta<Story>

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Required: args["question.Required"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Label",
  "question.Required": true,
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true
}