import { StorybookMeta } from ".storybook/storybook.typings";
import { LinkedDatesSummaryComponent } from "./linked-dates-summary.component";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion } from ".storybook/default";

export default {
  title: "Pages/Document-Builder/Question-Types/18-Linked-Dates/Summary",
  component: LinkedDatesSummaryComponent
} as StorybookMeta<LinkedDatesSummaryComponent>;

const Template: StoryFn<LinkedDatesSummaryComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Select Date Range",
    DateAndTime: new Date().addDays(-5),
    DateAndTime2: new Date().addDays(5)
  }
}