import { Meta, StoryFn } from "@storybook/angular";
import { LocalOperativeSearchComponent } from "./local-operative-search.component";
export default {
  title: "Shared/Modals/Operative-List/Local-Operative-Search",
  component: LocalOperativeSearchComponent
} as Meta;

const Template: StoryFn<LocalOperativeSearchComponent> = (args: LocalOperativeSearchComponent) => ({
  props: args
})

export const Default = Template.bind({});

Default.args = {
}