import { StoryFn } from "@storybook/angular";
import { LinkedDatesComponent } from "./linked-dates.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = LinkedDatesComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/18-Linked-Dates",
  component: LinkedDatesComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.CascadeOptionsText": { name: "CascadeOptionsText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.DateAndTime": { name: "DateAndTime", control: "date" },
    "question.DateAndTime2": { name: "DateAndTime", control: "date" },
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
      DateAndTime: args["question.DateAndTime"],
      DateAndTime2: args["question.DateAndTime2"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "From Date",
  "question.CascadeOptionsText": "To Date",
  "question.Required": true,
  "question.DateAndTime": new Date(),
  "question.DateAndTime2": new Date()
}