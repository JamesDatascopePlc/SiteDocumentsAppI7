import { AssetInspectionSchedule } from "src/app/core/http/asset.api";
import { Question } from "src/app/core/stores/site-document/models";
import { Prefix } from "src/app/shared/types";
import { AssetInspectionSchedulesComponent } from "./asset-inspection-schedules.component";
import { StorybookMeta } from ".storybook/storybook.typings";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

type Story = AssetInspectionSchedule & Prefix<Question, "question">;

export default {
  title: "Pages/Document-Builder/Question-Types/26-Asset-Inspection-Schedules",
  component: AssetInspectionSchedulesComponent,
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