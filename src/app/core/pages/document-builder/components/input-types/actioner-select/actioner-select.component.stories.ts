import { StoryFn, applicationConfig } from "@storybook/angular";
import { ActionerSelectComponent } from "./actioner-select.component";
import { StorybookMeta } from ".storybook/storybook.typings";
import { UserStore } from "src/app/core/stores/user/user.store";
import { of } from "rxjs";
import { defaultUser } from ".storybook/default";
import { Operative, OperativeSearchResult, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { faker } from "@faker-js/faker";

const userStore: Pick<UserStore, "user$"> = {
  user$: of(defaultUser)
}

const operatives: Operative[] = Array
  .from({ length: 3 })
  .map((val, idx) => 
    ({
      ID: idx + 2,
      Name: faker.name.fullName()
    })
  );

const searchResults: OperativeSearchResult[] = Array
  .from({ length: 10 })
  .map((val, idx) => 
    ({
      ID: idx + 1,
      Name: faker.name.fullName(),
      CompanyName: faker.company.name(),
      HasAppAccess: true,
      HasQRCode: true
    })
  );

const operativesStore: Pick<OperativesStore, "operatives$" | "searchResults$" | "searchResultsIsPending$" | "getSearchResults"> = {
  operatives$: of(operatives),
  searchResults$: of<OperativeSearchResult[]>(searchResults),
  searchResultsIsPending$: of(false),
  getSearchResults: () => of(searchResults)
}

export default {
  title: "Pages/Document-Builder/Input-Types/Actioner-Select",
  component: ActionerSelectComponent,
  argTypes: {
    title: { control: "text" },
    actioner: { control: "object" },
    actionerIdChange: { action: "actionerIdChange" }
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: UserStore,
          useValue: userStore
        },
        {
          provide: OperativesStore,
          useValue: operativesStore
        }
      ]
    })
  ]
} as StorybookMeta<ActionerSelectComponent>;

const Template: StoryFn<ActionerSelectComponent> = (args: ActionerSelectComponent) => ({
  props: args
});

export const Default = Template.bind({});