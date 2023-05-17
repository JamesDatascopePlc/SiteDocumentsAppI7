import { StorybookMeta } from ".storybook/storybook.typings";
import { DocumentImagesModal } from "./document-images.modal";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Modals/Document-Images",
  component: DocumentImagesModal
} as StorybookMeta<DocumentImagesModal>;

const Template: StoryFn<DocumentImagesModal> = args => ({
  props: args
});

export const Default = Template.bind({});