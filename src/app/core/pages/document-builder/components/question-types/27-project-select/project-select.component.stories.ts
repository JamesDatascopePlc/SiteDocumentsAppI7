import { Prefix } from "src/app/shared/types";
import { ProjectSelectComponent } from "./project-select.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = ProjectSelectComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/27-Project-Select",
  component: ProjectSelectComponent,
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