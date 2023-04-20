import { defaultQuestion } from ".storybook/default";
import { StoryFn } from "@storybook/angular";
import { NumberComponent } from "./number.component";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = NumberComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/12-Number",
  component: NumberComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.NumberVal": { name: "NumberVal", control: { type: "number" } },
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
      NumberVal: args["question.NumberVal"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Weight (kg)",
  "question.Required": true,
  "question.NumberVal": 0,
  "question.CanHaveFiles": true,
  "question.CanHaveImg": true
}