import { Prefix } from "src/app/shared/types";
import { AssetGroupsAndTypesComponent } from "./asset-groups-and-types.component";
import { Question } from "src/app/core/stores/site-document/models";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";
import { StorybookMeta } from ".storybook/storybook.typings";

type Story = AssetGroupsAndTypesComponent & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/23-Asset-Groups-And-Types",
  component: AssetGroupsAndTypesComponent,
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