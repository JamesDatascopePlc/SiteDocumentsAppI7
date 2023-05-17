import { StorybookMeta } from ".storybook/storybook.typings";
import { SignaturePadComponent } from "./signature-pad.component";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Shared/Signature-Pad",
  component: SignaturePadComponent,
} as StorybookMeta<SignaturePadComponent>;

const Template: StoryFn<SignaturePadComponent> = args => ({
  props: args
});

export const Default = Template.bind({});