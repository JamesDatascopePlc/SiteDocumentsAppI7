import { Meta, StoryFn } from "@storybook/angular";
import { DocumentPageNavigationComponent } from "./document-page-navigation.component";

export default {
  title: "Pages/Document-Builder/Document-Page-Navigation",
  component: DocumentPageNavigationComponent,
  argTypes: {}
} as Meta;

const Template: StoryFn<DocumentPageNavigationComponent> = (args: DocumentPageNavigationComponent) => ({
  props: args
});

export const Default = Template.bind({});