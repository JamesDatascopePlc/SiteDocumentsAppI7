import { Prefix } from "src/app/shared/types";
import { LinkedTimesComponent } from "./linked-times.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = LinkedTimesComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/33-Linked-Time",
  component: LinkedTimesComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.CascadeOptionsText": { name: "CascadeOptionsText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.DateAndTime": { name: "DateAndTime", control: "date" },
    "question.DateAndTime2": { name: "DateAndTime2", control: "date" },
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      CascadeOptionsText: args["question.CascadeOptionsText"],
      Required: args["question.Required"],
      DateAndTime: args["question.DateAndTime"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "From",
  "question.CascadeOptionsText": "To",
  "question.Required": true,
  "question.DateAndTime": new Date(),
  "question.DateAndTime2": new Date()
}