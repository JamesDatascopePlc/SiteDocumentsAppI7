import { defaultQuestion, defaultSection } from ".storybook/default";
import { StoryFn } from "@storybook/angular";
import { RadioGroupTextboxComponent } from "./radio-group-textbox.component";
import { Question, QuestionType, Section } from "src/app/core/stores/site-document/models";
import { Prefix } from "src/app/shared/types";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = RadioGroupTextboxComponent 
  & Prefix<Omit<Question, "YesNoNA"> & { YesNoNA: "Yes" | "No" | "NA" | boolean | null }, "question">
  & Prefix<Section, "section">;

export default {
  title: "Pages/Document-Builder/Question-Types/07-Radio-Group-Textbox",
  component: RadioGroupTextboxComponent,
  argTypes: {
    question: { table: { disable: true } },
    section: { table: { disable: true } },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Required": { name: "Required", control: "boolean" },
    "question.YesNoNA": { name: "YesNoNA", control: "select", options: ["Yes", "No", "NA"] },
    "question.AnswerText": { name: "AnswerText", control: "text" },
    "question.CanHaveImg": { name: "CanHaveImg", control: "boolean" },
    "question.CanHaveFiles": { name: "CanHaveFiles", control: "boolean" },
    "section.TableTitles": { name: "TableTitles", control: "object" }
  }
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
      AnswerText: args["question.AnswerText"],
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
  question: {
    ...defaultQuestion,
    QuestionText: "Radio Group Question with textbox"
  },
  section: {
    SectionID: 1,
    SectionNo: 1,
    SectionQuestiontype: QuestionType.RadioGroup,
    SectionTitle: "",
    IsRepeatable: false,
    Questions: [],
    Hidden: false,
    TableTitles: ["Yes", "No", "N/A"]
  }
}

Default.args = {
  "question.QuestionText": "Radio Group Question with textbox",
  "question.Required": true,
  "question.YesNoNA": null,
  "question.AnswerText": "",
  "question.CanHaveImg": true,
  "question.CanHaveFiles": true,
  "section.TableTitles": ["Yes", "No", "N/A"]
}