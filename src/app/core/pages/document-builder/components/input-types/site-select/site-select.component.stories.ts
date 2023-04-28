import { StorybookMeta } from ".storybook/storybook.typings";
import { SiteSelectComponent } from "./site-select.component";
import { StoryFn, applicationConfig } from "@storybook/angular";
import { UserStore } from "src/app/core/stores/user/user.store";
import { faker } from "@faker-js/faker";
import { of } from "rxjs";

const userStoreMock: Partial<UserStore> = {
  sites$: of(Array
    .from({ length: 10 })
    .map((val, idx) => 
      ({
        Id: idx,
        Name: faker.company.name()
      })
  ))
}

export default {
  title: "Pages/Document-Builder/Input-Types/Site-Select",
  component: SiteSelectComponent,
  argTypes: {
    title: { control: "text" },
    valueChange: { action: "valueChange" }
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: UserStore,
          useValue: userStoreMock
        }
      ]
    })
  ]
} as StorybookMeta<SiteSelectComponent>;

const Template: StoryFn<SiteSelectComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  title: "Choose a Site"
}

export const PrepopulatedSite = Template.bind({});

PrepopulatedSite.args = {
  siteId: +faker.random.numeric(1)
}