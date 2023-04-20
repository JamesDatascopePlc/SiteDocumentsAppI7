import { StoryFn } from "@storybook/angular";
import { DatetimeComponent } from "./datetime.component";
import { defaultQuestion } from ".storybook/default";
import { StorybookMeta } from ".storybook/storybook.typings";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";

type Story = DatetimeComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/09-Datetime",
  component: DatetimeComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.DateAndTime": { name: "DateAndTime", control: "date" }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Required: args["question.Required"],
      DateAndTime: args["question.DateAndTime"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Select Date and Time",
  "question.Required": true,
  "question.DateAndTime": new Date()
}