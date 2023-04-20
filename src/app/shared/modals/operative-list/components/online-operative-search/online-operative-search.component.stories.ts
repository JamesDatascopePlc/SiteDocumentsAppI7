import { Meta, StoryFn } from "@storybook/angular";
import { OnlineOperativeSearchComponent } from "./online-operative-search.component";

export default {
  title: "Shared/Modals/Operative-List/Online-Operative-Search",
  component: OnlineOperativeSearchComponent
} as Meta;

const Template: StoryFn<OnlineOperativeSearchComponent> = args => ({
  props: args
})

export const Default = Template.bind({});