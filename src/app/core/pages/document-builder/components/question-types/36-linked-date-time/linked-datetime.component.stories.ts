import { Prefix } from "src/app/shared/types";
import { LinkedDatetimeComponent } from "./linked-datetime.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = LinkedDatetimeComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/36-Linked-Datetime",
  component: LinkedDatetimeComponent,
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