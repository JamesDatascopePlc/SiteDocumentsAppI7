import { StorybookMeta } from ".storybook/storybook.typings";
import { ChildDocumentCardComponent } from "./child-document-card.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Components/Child-Document-Card",
  component: ChildDocumentCardComponent
} as StorybookMeta<ChildDocumentCardComponent>;

const Template: StoryFn<ChildDocumentCardComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  templateId: 1
}