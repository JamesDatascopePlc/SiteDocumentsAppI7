import { Prefix } from "src/app/shared/types";
import { HraSelectComponent } from "./hra-select.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = HraSelectComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/34-High-Risk-Activity-Select",
  component: HraSelectComponent,
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