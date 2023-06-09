import { StorybookMeta } from ".storybook/storybook.typings";
import { ResponsibilityAreaSelectComponent } from "./responsibility-area-select.component";
import { StoryFn, applicationConfig } from "@storybook/angular";
import { ResponsibilityAreaType, ResponsibilityAreaTypesStore } from "src/app/core/stores/responsibility-area-types/responsibility-area-types.store";
import { faker } from "@faker-js/faker";
import { of } from "rxjs";

const resAreaType: ResponsibilityAreaType = {
  Id: 1,
  AppQuestionText: faker.lorem.words(),
  TypeName: faker.lorem.word(),
  Areas: Array
    .from({ length: 10 })
    .map((val, idx) => 
      ({
        Id: idx,
        Name: faker.commerce.department(),
        DocResAreaTypeId: +faker.random.numeric()
      })
    )
}

const responsibilityAreaTypesStore: Partial<ResponsibilityAreaTypesStore> = {
  responsibilityAreaTypeById$: () => of(resAreaType)
}

export default {
  title: "Pages/Document-Builder/Input-Types/Responsibility-Area-Select",
  component: ResponsibilityAreaSelectComponent,
  argTypes: {
    responsibilityAreaTypeId: { type: "number" },
    responsibilityAreaTypeIdChange: { action: "responsibilityAreaTypeIdChange" }
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ResponsibilityAreaTypesStore,
          useValue: responsibilityAreaTypesStore
        }
      ]
    })
  ]
} as StorybookMeta<ResponsibilityAreaSelectComponent>;

const Template: StoryFn<ResponsibilityAreaSelectComponent> = args => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  responsibilityAreaTypeId: 1
}

// export const NoResponsibilityAreasExample = Template.bind({});

// NoResponsibilityAreasExample.args = {
//   responsibilityAreaType$: of<ResponsibilityAreaType | undefined>(undefined)
// }