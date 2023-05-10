import { StorybookMeta } from ".storybook/storybook.typings";
import { AssetListModal } from "./asset-list.modal";
import { StoryFn } from "@storybook/angular";

export default {
  title: "Shared/Modals/Asset-List",
  component: AssetListModal,
} as StorybookMeta<AssetListModal>;

const Template: StoryFn<AssetListModal> = (args: AssetListModal) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isOpen: true
}