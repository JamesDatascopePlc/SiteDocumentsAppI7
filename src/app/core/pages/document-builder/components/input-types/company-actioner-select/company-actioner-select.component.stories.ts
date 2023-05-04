import { StorybookMeta } from ".storybook/storybook.typings";
import { CompanyActionerSelectComponent } from "./company-actioner-select.component";
import { StoryFn, applicationConfig } from "@storybook/angular";
import { faker } from "@faker-js/faker";
import { of } from "rxjs";
import { Company, UserStore } from "src/app/core/stores/user/user.store";

const userStoreMock: Partial<UserStore> = {
  companies$: of<Company[]>(Array
    .from({ length: 10 })
    .map((val, idx) => 
      ({
        Id: idx,
        Text: faker.company.name()
      })
  ))
}

export default {
  title: "Pages/Document-Builder/Input-Types/Company-Actioner-Select",
  component: CompanyActionerSelectComponent,
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
} as StorybookMeta<CompanyActionerSelectComponent>;

const Template: StoryFn<CompanyActionerSelectComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  title: "Select a company"
}

export const PrepopulatedCompany = Template.bind({});

PrepopulatedCompany.args = {
  companyId: +faker.random.numeric(1)
}
