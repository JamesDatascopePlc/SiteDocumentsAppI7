import { StoryFn } from "@storybook/angular";
import { SignatureComponent } from "./signature.component";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { defaultQuestion } from ".storybook/default";

type Story = SignatureComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/19-Signature",
  component: SignatureComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.AnswerText": { name: "AnswerText", control: "text" }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Required: args["question.Required"],
      AnswerText: args["question.AnswerText"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Sign Here",
  "question.Required": true,
  "question.AnswerText": ""
}