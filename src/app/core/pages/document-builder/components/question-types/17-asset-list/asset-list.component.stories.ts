import { Prefix } from "src/app/shared/types";
import { AssetListComponent } from "./asset-list.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";
import { faker } from "@faker-js/faker";

type Story = AssetListComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/17-Asset-List",
  component: AssetListComponent,
  argTypes: {
    question: { table: { disable: true } },
    isMobileApp: { control: "boolean" },
    "question.QuestionText": { name: "QuestionText", control: "text" },
    "question.Assets": { name: "Assets", control: "object" }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: {
      ...defaultQuestion,
      QuestionText: args["question.QuestionText"],
      Assets: args["question.Assets"]
    }
  }
});

export const Default = Template.bind({});

Default.args = {
  isMobileApp: false,
  "question.QuestionText": "Assets",
  "question.Assets": Array
    .from({ length: 3 })
    .map(() => 
    ({
      AssetID: +faker.random.numeric(2),
      Name: faker.lorem.word(),
      Tag: faker.lorem.word(),
    })
  )
}