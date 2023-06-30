import { StorybookMeta } from ".storybook/storybook.typings";
import { AssetInfoPage } from "./asset-info.page";
import { StoryFn } from "@storybook/angular";
import { of } from "rxjs";
import { AssetInfo, DetailsList } from "../../../http/asset.api";
import { faker } from "@faker-js/faker";

export default {
  title: "Pages/Info/Asset-Info",
  component: AssetInfoPage,
} as StorybookMeta<AssetInfoPage>;

const Template: StoryFn<AssetInfoPage> = args => ({
  props: args
});

export const Default = Template.bind({});

const info: AssetInfo = {
  ID: 1,
  AssetID: "",
  AcquiredDate: new Date(),
  DateOnSite: new Date(),
  DateOffHired: new Date(),
  TypeName: faker.lorem.word(),
  Registration: faker.lorem.word(),
  QRCode: "",
  SiteID: 1,
  AssetFileName: "",
  DetailsLists: Array.from({ length: 5 })
    .map(() => 
      ({
        Title: faker.lorem.words(),
        ListItems: Array.from({ length: 5 })
          .map(() => 
            ({
              Icon: "accessibility-outline",
              CssClass: "",
              Content: faker.lorem.sentence(),
              Date: new Date(),
              Id: 1,
              IconStyle: {},
              ListItemType: faker.lorem.word()
            })
          )
      } as DetailsList)
  ),
  Base64Img: null,
  PurchaseValue: "",
  AssetNotes: "",
  Location: faker.lorem.word(),
  TemplateIDs: [1]
}

Default.args = {
  assetInfo$: of<AssetInfo>(info)
}