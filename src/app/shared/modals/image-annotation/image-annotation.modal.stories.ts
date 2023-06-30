import { StorybookMeta } from ".storybook/storybook.typings";
import { ImageAnnotationModal } from "./image-annotation.modal";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Shared/Image-Annotation",
  component: ImageAnnotationModal,
  argTypes: {
    isOpen: { control: "boolean" }
  }
} as StorybookMeta<ImageAnnotationModal>;

const Template: StoryFn<ImageAnnotationModal> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isOpen: true
}