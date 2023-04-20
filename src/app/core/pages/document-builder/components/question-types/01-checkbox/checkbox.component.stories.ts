import { StoryFn } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";
import { defaultQuestion } from ".storybook/default";
import { StorybookMeta } from ".storybook/storybook.typings";
import { Question } from "src/app/core/stores/site-document/models";
import { Prefix } from "src/app/shared/types";

type Story = CheckboxComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/01-Checkbox",
  component: CheckboxComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.YesNoNA": { name: "YesNoNA", control: "boolean" },
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
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Is it vegan-friendly?",
  "question.Required": true,
  "question.YesNoNA": false,
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true
}