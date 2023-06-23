import { StorybookMeta } from ".storybook/storybook.typings";
import { RemainAnonymousSummaryComponent } from "./remain-anonymous-summary.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Input-Types/Remain-Anonymous/Summary",
  component: RemainAnonymousSummaryComponent,
} as StorybookMeta<RemainAnonymousSummaryComponent>;

const Template: StoryFn<RemainAnonymousSummaryComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isTicked: true
}