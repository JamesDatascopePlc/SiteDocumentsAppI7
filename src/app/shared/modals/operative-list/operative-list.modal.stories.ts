import { Meta, StoryFn, applicationConfig } from "@storybook/angular";
import { OperativeListModal } from "./operative-list.modal";
import { UserStore } from "src/app/core/stores/user/user.store";
import { of } from "rxjs";
import { Operative, OperativeSearchResult, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { defaultUser } from ".storybook/default";
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
  title: "Shared/Modals/Operative-List",
  component: OperativeListModal,
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
} as Meta;

const Template: StoryFn<OperativeListModal> = (args: OperativeListModal) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  isOpen: true
}