import { Prefix } from "src/app/shared/types";
import { RamsSelectComponent } from "./rams-select.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = RamsSelectComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/28-Rams-Select",
  component: RamsSelectComponent,
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