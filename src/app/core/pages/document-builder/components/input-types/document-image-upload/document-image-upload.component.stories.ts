import { StorybookMeta } from ".storybook/storybook.typings";
import { DocumentImageUploadComponent } from "./document-image-upload.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Pages/Document-Builder/Input-Types/Document-Image-Upload",
  component: DocumentImageUploadComponent,
  argTypes: {
    images: { control: "object" },
    imagesChange: { action: "imagesChange" }
  }
} as StorybookMeta<DocumentImageUploadComponent>;

const Template: StoryFn<DocumentImageUploadComponent> = args => ({
  props: args
});

export const Default = Template.bind({});