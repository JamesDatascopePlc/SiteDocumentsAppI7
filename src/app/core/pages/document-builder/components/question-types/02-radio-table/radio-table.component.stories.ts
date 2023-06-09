import { StoryFn } from "@storybook/angular";
import { RadioTableComponent } from "./radio-table.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";

type Story = RadioTableComponent & Prefix<Omit<Question, "YesNoNA"> & { YesNoNA: "Yes" | "No" | "NA" | boolean | null }, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/02-Radio-Table",
  component: RadioTableComponent,
  argTypes: {
    question: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.YesNoNA": { name: "YesNoNA", control: "select", options: ["Yes", "No", "NA"] },
    "question.CanHaveImg": { name: "CanHaveImg", control: "boolean" },
    "question.CanHaveFiles": { name: "CanHaveFiles", control: "boolean" }
  }
}

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Required: args["question.Required"],
      YesNoNA: args["question.YesNoNA"] === "Yes" ? true 
        : args["question.YesNoNA"] === "No" ? false
        : args["question.YesNoNA"] === "NA" ? null
        : args["question.YesNoNA"],
      CanHaveImg: args["question.CanHaveImg"],
      CanHaveFiles: args["question.CanHaveFiles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Radio Group Question",
  "question.Required": true,
  "question.YesNoNA": null,
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true,
}