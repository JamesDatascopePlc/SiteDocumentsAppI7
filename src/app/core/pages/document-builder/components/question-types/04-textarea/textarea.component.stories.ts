import { StoryFn } from "@storybook/angular";
import { TextareaComponent } from "./textarea.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = TextareaComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/04-Textarea",
  component: TextareaComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.AnswerText": { name: "AnswerText", control: "text" },
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
      AnswerText: args["question.AnswerText"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Type in some text",
  "question.Required": true,
  "question.AnswerText": "",
  "question.CanHaveFiles": true,
  "question.CanHaveImg": true
}