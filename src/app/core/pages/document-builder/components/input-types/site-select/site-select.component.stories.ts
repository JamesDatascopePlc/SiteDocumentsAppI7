import { StorybookMeta } from ".storybook/storybook.typings";
import { SiteSelectComponent } from "./site-select.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Input-Types/Site-Select",
  component: SiteSelectComponent,
  argTypes: {
    title: { control: "text" }
  }
} as StorybookMeta<SiteSelectComponent>;

const Template: StoryFn<SiteSelectComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  title: "Choose a Site"
}