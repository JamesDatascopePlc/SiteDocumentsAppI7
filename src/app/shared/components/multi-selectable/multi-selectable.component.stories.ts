import { faker } from "@faker-js/faker";
import { IonicModule } from "@ionic/angular";
import { Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { MultiSelectableComponent } from "./multi-selectable.component";

export default {
  title: "Shared/Multi-Selectable",
  component: MultiSelectableComponent,
  argTypes: {
    id: { control: "text" },
    placeholder: { control: "text" },
    title: { control: "text" },
    items: { control: "object" },
    itemText: { control: "text" },
    itemVal: { control: "text" },
    canClear: { control: "boolean" },
    values: { control: "object" },
    valuesChange: { action: "valuesChange" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
} as Meta;

const Template: StoryFn<MultiSelectableComponent> = (args: MultiSelectableComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  id: crypto.randomUUID(),
  placeholder: "Select",
  title: "Example",
  items: Array.from({ length: 10 }).map(() => faker.animal.dog()),
  itemText: null,
  itemVal: null,
  values: [],
  canClear: true
}

