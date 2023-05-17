import { StorybookMeta } from ".storybook/storybook.typings";
import { CategoryActionerSelectComponent } from "./category-actioner-select.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Input-Types/Category-Actioner-Select",
  component: CategoryActionerSelectComponent,
  argTypes: {
    title: { control: "text" },
    actionerIdChange: { action: "actionerIdChange" }
  }
} as StorybookMeta<CategoryActionerSelectComponent>;

const Template: StoryFn<CategoryActionerSelectComponent> = args => ({
  props: args
});

export const Default = Template.bind({});