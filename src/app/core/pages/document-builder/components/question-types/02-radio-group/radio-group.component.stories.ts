import { defaultQuestion, defaultSection } from ".storybook/default";
import { StoryFn } from "@storybook/angular";
import { RadioGroupComponent } from "./radio-group.component";
import { Question, Section } from "src/app/core/stores/site-document/models/site-document.model";
import { StorybookMeta } from ".storybook/storybook.typings";
import { Prefix } from "src/app/shared/types";

type Story = RadioGroupComponent 
  & Prefix<Omit<Question, "YesNoNA"> & { YesNoNA: "Yes" | "No" | "NA" | boolean | null }, "question">
  & Prefix<Section, "section">;

export default {
  title: "Pages/Document-Builder/Question-Types/02-Radio-Group",
  component: RadioGroupComponent,
  argTypes: {
    question: { table: { disable: true } },
    section: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.YesNoNA": { name: "YesNoNA", control: "select", options: ["Yes", "No", "NA"] },
    "question.CanHaveImg": { name: "CanHaveImg", control: "boolean" },
    "question.CanHaveFiles": { name: "CanHaveFiles", control: "boolean" },
    "section.TableTitles": { name: "TableTitles", control: "object" }
  },
} as StorybookMeta<Story>;

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
    },
    section: {
      ...defaultSection,
      TableTitles: args["section.TableTitles"]
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
  "section.TableTitles": ["Yes", "No", "N/A"]
}