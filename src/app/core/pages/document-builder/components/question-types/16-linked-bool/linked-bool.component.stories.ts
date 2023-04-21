import { Question, Section } from "src/app/core/stores/site-document/models";
import { LinkedBoolComponent } from "./linked-bool.component";
import { Prefix } from "src/app/shared/types";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion, defaultSection } from ".storybook/default";

type Story = LinkedBoolComponent 
  & Prefix<Question, "question">
  & Prefix<Section, "section">;

export default {
  title: "Pages/Document-Builder/Question-Types/16-Linked-Bool",
  component: LinkedBoolComponent,
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
    },
    section: {
      ...defaultSection,
      TableTitles: args["section.TableTitles"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  "question.QuestionText": "Linked boolean",
  "question.Required": true,
  "question.YesNoNA": false,
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true,
  "section.TableTitles": ["", "A", "B"]
}