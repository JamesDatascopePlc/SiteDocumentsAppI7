import { Meta, StoryFn } from "@storybook/angular";
import { LocalOperativeSearchComponent } from "./local-operative-search.component";
import { of } from "rxjs";
import { User } from "src/app/core/stores/user/user.store";
import { faker } from "@faker-js/faker";
import { Operative } from "src/app/core/stores/operative/operatives.store";

export default {
  title: "Shared/Modals/Operative-List/Local-Operative-Search",
  component: LocalOperativeSearchComponent
} as Meta;

const Template: StoryFn<LocalOperativeSearchComponent> = (args: LocalOperativeSearchComponent) => ({
  props: args
})

export const Default = Template.bind({});

const user: User = {
  Id: 1,
  FirstName: "John",
  LastName: "Doe",
  NavTab: "Modules",
  NumberOfTemplates: 100,
  Pin: "1234",
  Token: "ABCD1234",
  TemplatesLastUpdate: new Date(),
  Url: "",
  Site: { Id: 1, Name: "Site Somewhere" },
  SelectedSite: { Id: 1, Name: "Site Somewhere" },
  UseFingerReader: true,
  UserSites: [],
  ShowWeightingsOnApp: true,
  CompanyName: faker.company.name(),
  CanAddAsssetsToDocsByName: true,
  CanAddOperativesToDocsByName: true,
  CanAddQRsToAssets: true,
  CanModifyOperativeQRs: true,
  CanOffHireAssets: true,
  CanViewOtherOperativeInfo: true,
  Colour: faker.color.rgb({ prefix: "" }),
  CompanyId: 1,
  DocumentListingTab: "Recent",
  DownloadedTemplates: 100, 
  FontColour: faker.color.rgb({ prefix: "" }),
  HasAssetCreation: true,
  HasAssets: true,
  HasBasicOpInfo: true,
  HasCategoryActioners: true,
  HasCollabPlanning: true,
  HasCompanies: true,
  HasCompanySelectWithOtherOption: true,
  HasCustomLookups: true,
  HasDataTouchAreas: true,
  HasDocDrop: true,
  HasDocQrCodes: true,
  HasDocQueues: true,
  HasHadWifiPreferenceChecked: true,
  HasHideOperativeScan: true,
  HasLiveQueues: true,
  HasMyOpInfo: true,
  HasOperativeInfo: true,
  HasPlanningMeeting: true,
  HasProjectsOnDocDrop: true,
  HasQueueSupervisors: true,
  HasRamsList: true,
  HasRandomOperativebarcodes: true,
  HasRegisteredPlayerId: 1,
  HasResAreas: true,
  HasReviewMeeting: true,
  HasShowParentAnswersOnChildDoc: true,
  HasSimpleSwipes: true,
  HasSites: true,
  HasTemplateSender: true,
  HasUpdateableDocs: true,
  HasViewDocumentAsSinglePage: true,
  HideSearchOnOperativeAccess: true,
  HideSearchOnOperativeInfo: true,
  IsInSupervisorRole: true
}

const operatives: Operative[] = Array
  .from({ length: 3 })
  .map((val, idx) => 
    ({
      ID: idx + 2,
      Name: faker.name.fullName()
    })
  );

Default.args = {
  user$: of<User>(user),
  operatives$: of<Operative[]>(operatives)
}