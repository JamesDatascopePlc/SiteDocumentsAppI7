import { defaultQuestion, defaultSection, defaultSiteDocument } from ".storybook/default";
import { faker } from "@faker-js/faker";
import { Meta, StoryFn } from "@storybook/angular";
import { of } from "rxjs";
import { DocumentBuilderPage } from "./document-builder.page";
import { SiteDocument } from "../../stores/site-document/models";
import { QuestionType } from "../../stores/site-document/models/site-document.model";
import { trackOf } from "src/app/shared/rxjs";

export default {
  title: "Pages/Document-Builder",
  component: DocumentBuilderPage,
  argTypes: {
    document$: { control: "object" }
  }
} as Meta;

const Template: StoryFn<DocumentBuilderPage> = (args: DocumentBuilderPage) => ({
  props: {
    ...args,
    id$: of(1)
  },
  styles: [`
    app-document-builder { display: contents; }
  `]
});

export const Default = Template.bind({});

Default.args = {
  document: trackOf<SiteDocument>({
    ...defaultSiteDocument,
    DocumentTitle: faker.lorem.word(),
    Pages: [
      {
        PageID: 1,
        PageTitle: faker.lorem.word(),
        PageNo: 1,
        Hidden: false,
        Sections: Object
          .values(QuestionType)
          .filter(qt => typeof qt === "number")
          .map((qt, idx) => 
            ({
              ...defaultSection,
              SectionID: idx,
              SectionNo: idx,
              SectionTitle: "",
              SectionQuestiontype: qt as QuestionType,
              Questions: [
                {
                  ...defaultQuestion,
                  QuestionText: QuestionType[qt as number].toString()
                }
              ]
            })
          )
      }
    ]
  })
}

export const DocumentWithAllPermissionsTurnedOn = Template.bind({});

DocumentWithAllPermissionsTurnedOn.args = {
  document: trackOf({
    ...defaultSiteDocument,
    DocumentTitle: faker.lorem.word(),
    Pages: [
      {
        PageID: 1,
        PageTitle: faker.lorem.word(),
        PageNo: 1,
        Hidden: false,
        Sections: Object
          .values(QuestionType)
          .filter(qt => typeof qt === "number")
          .map((qt, idx) => 
            ({
              ...defaultSection,
              SectionID: idx,
              SectionNo: idx,
              SectionTitle: "",
              SectionQuestiontype: qt as QuestionType,
              Questions: [
                {
                  ...defaultQuestion,
                  QuestionText: QuestionType[qt as number].toString()
                }
              ]
            })
          )
      }
    ],
    Queues: Array
      .from({ length: 5 })
      .map((val, idx) => 
        ({
          Key: idx.toString(),
          Value: faker.lorem.word()
        })
    ),
    CanAddAsset: true,
    CanAddOperative: true,
    CanCreateHotspot: true,
    CanAddActionerFromApp: true,
    CanAddCategoryActioner: true,
    CanCreateAssetsFromDocument: true,
    CanHaveCompanyActioner: true,
    CanHaveDocLevelPhotoRoll: true,
    CanHaveDocumentLevelImages: true,
    CanHaveQueueDuration: true,
    ShowDocLevelPhotoButtonAtStartOfDoc: true,
    CanBeAddedToHotspot: true,
    CanBeSavedAsDraft: true,
    AllowAnon: true,
    RemainAnon: false,
    ReqGps: true,
    MetaData: {
      ActionerText: faker.lorem.word(),
      CanBeEditableDocument: true,
      CannotAddSelfAsActioner: true,
      HasSiteList: true,
      ColourHex: faker.color.rgb({ prefix: "", casing: "upper" }),
      QueueSelectorTitle: faker.lorem.word()
    }
  })
}

export const DocumentWithMultiplePages = Template.bind({});

DocumentWithMultiplePages.args = {
  document: trackOf({
    ...defaultSiteDocument,
    DocumentTitle: faker.lorem.word(),
    Pages: Object
      .values(QuestionType)
      .filter(qt => typeof qt === "number")
      .map((qt, idx) => 
        ({
          PageID: idx,
          PageTitle: "",
          PageNo: idx + 1,
          Hidden: false,
          Sections: [
            {
              ...defaultSection,
              SectionID: idx,
              SectionNo: idx,
              SectionTitle: "",
              SectionQuestiontype: qt as QuestionType,
              Questions: [
                {
                  ...defaultQuestion,
                  QuestionText: QuestionType[qt as number].toString()
                }
              ]
            }
          ]
        })
    )
  })
}