import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/angular';
import { SelectableComponent } from "./selectable.component";

export default {
  title: "Shared/Selectable",
  component: SelectableComponent,
  argTypes: {
    id: { control: "text" },
    placeholder: { control: "text" },
    title: { control: "text" },
    items: { control: "object" },
    itemText: { control: "text" },
    canClear: { control: "boolean" },
    value: { control: "text" },
    valueChange: { action: "valueChange" },
    itemChange: { action: "itemChange" }
  }
} as Meta;

const Template: StoryFn<SelectableComponent> = (args: SelectableComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  id: crypto.randomUUID(),
  placeholder: "Select",
  title: "Example",
  items: Array.from({ length: 10 }).map(() => faker.animal.dog()),
  itemText: null,
  value: null,
}

export const ObjectSelectable = Template.bind({}) as StoryFn<SelectableComponent<{ name: string }>>;

ObjectSelectable.args = {
  id: crypto.randomUUID(),
  placeholder: "Pick a birb",
  title: "Birbs",
  items: Array.from({ length: 20 }).map(() => 
    ({  
      name: faker.animal.bird()
    })
  ),
  itemValue: "name",
  itemText: "name",
  value: null,
}

export const PrepopulatedSelectable = Template.bind({});

PrepopulatedSelectable.args = {
  id: crypto.randomUUID(),
  placeholder: "",
  title: "Mountains",
  items: [
    "Snowdon",
    "Mount Everest",
    "K2",
    "Mount Fuji",
    "Broad Peak",
    "Blanca Peak"
  ],
  itemText: null,
  value: "Snowdon"
}