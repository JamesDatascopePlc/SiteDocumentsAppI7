import { StorybookMeta } from ".storybook/storybook.typings";
import { CompanySelectComponent } from "./company-select.component";
import { Question } from "src/app/core/stores/site-document/models";
import { Prefix } from "src/app/shared/types";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = CompanySelectComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/21-Company-Select",
  component: CompanySelectComponent,
  argTypes: {
    question: { table: { disable: true } }
  }
} as StorybookMeta<Story>;

const Template: StoryFn<Story> = args => ({
  props: {
    ...args,
    question: defaultQuestion
  }
});

export const Default = Template.bind({});