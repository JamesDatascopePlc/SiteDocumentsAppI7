import { IonicModule } from "@ionic/angular";
import { Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";
import { defaultQuestion } from ".storybook/default";
import { StorybookArgTypes } from ".storybook/storybook.typings";
import { Question } from "src/app/core/stores/site-document/models";
import { Prefix } from "src/app/shared/types/prefix.type";

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
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
} as Meta & { argTypes: StorybookArgTypes<CheckboxComponent & Prefix<Question, "question">> };

const Template: StoryFn<CheckboxComponent & Prefix<Question, "question">> = (args: CheckboxComponent & Prefix<Question, "question">) => ({
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