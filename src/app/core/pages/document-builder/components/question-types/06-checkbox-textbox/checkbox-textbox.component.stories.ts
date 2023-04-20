import { StoryFn } from "@storybook/angular";
import { CheckboxTextboxComponent } from "./checkbox-textbox.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = CheckboxTextboxComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/06-Checkbox-Textbox",
  component: CheckboxTextboxComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.YesNoNA": { name: "YesNoNA", control: "boolean" },
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
      YesNoNA: args["question.YesNoNA"],
      AnswerText: args["question.AnswerText"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Is it keto-friendly and why?",
  "question.Required": true,
  "question.YesNoNA": false,
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true
}