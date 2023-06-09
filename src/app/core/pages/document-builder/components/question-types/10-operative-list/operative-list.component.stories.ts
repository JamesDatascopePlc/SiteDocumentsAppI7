import { faker } from "@faker-js/faker";
import { StoryFn } from "@storybook/angular";
import { OperativeListComponent } from "./operative-list.component";
import { defaultQuestion } from ".storybook/default";
import { Prefix } from "src/app/shared/types";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = OperativeListComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/10-Operative-List",
  component: OperativeListComponent,
  argTypes: {
    question: { table: { disable: true } },
    isMobileApp: { control: "boolean" },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Operatives": { name: "Operatives", control: "object" }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Operatives: args["question.Operatives"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  isMobileApp: false,
  "question.QuestionText": "Operatives",
  "question.Operatives": Array
    .from({ length: 3 })
    .map(() => 
    ({
      AttendeeID: +faker.random.numeric(2),
      Name: faker.name.fullName(),
      DateAttended: new Date()
    })
  )
}