import { Meta, StoryFn } from "@storybook/angular";
import { LocalOperativeSearchComponent } from "./local-operative-search.component";
import { of } from "rxjs";
import { User } from "src/app/core/stores/user/user.store";
import { faker } from "@faker-js/faker";
import { Operative } from "src/app/core/stores/operative/operatives.store";
import { defaultUser } from ".storybook/default";

export default {
  title: "Shared/Modals/Operative-List/Local-Operative-Search",
  component: LocalOperativeSearchComponent
} as Meta;

const Template: StoryFn<LocalOperativeSearchComponent> = (args: LocalOperativeSearchComponent) => ({
  props: args
})

export const Default = Template.bind({});

const operatives: Operative[] = Array
  .from({ length: 3 })
  .map((val, idx) => 
    ({
      ID: idx + 2,
      Name: faker.name.fullName()
    })
  );

Default.args = {
  user$: of<User>(defaultUser),
  operatives$: of<Operative[]>(operatives)
}