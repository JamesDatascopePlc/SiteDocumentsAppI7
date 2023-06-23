import { faker } from "@faker-js/faker";
import { StoryFn } from "@storybook/angular";
import { QueueSelectComponent } from "./queue-select.component";

export default {
  title: "Pages/Document-Builder/Input-Types/Queue-Select",
  component: QueueSelectComponent,
  argTypes: {
    title: { control: "text" },
    queues: { control: "object" },
    queueId: { control: "number" },
    queueIdChange: { action: "valueChange" },
    init$: { control: "object" },
    change$: { control: "object" },
    value$: { control: "object" }
  }
}

const Template: StoryFn<QueueSelectComponent> = (args: QueueSelectComponent) => ({
  props: args
});

const queues = Array
  .from({ length: 10 })
  .map((val, idx) => 
    ({
      Id: idx,
      Name: faker.lorem.word()
    })
  );

export const Default = Template.bind({});

Default.args = {
  title: "Select a queue",
  queues
}

export const Prepopulated = Template.bind({});

Prepopulated.args = {
  title: "Prepopulated Queue Example",
  queueId: queues[+faker.random.numeric(1)]?.Id,
  queues
}