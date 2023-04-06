import { defaultQuestion, defaultSection, defaultSiteDocument } from ".storybook/default";
import { faker } from "@faker-js/faker";
import { applicationConfig, Meta, StoryFn } from "@storybook/angular";
import { Observable, of, Subject } from "rxjs";
import { FormFillerStore } from "../../stores/site-document/form-filler/form-filler.store";
import { DocumentBuilderPage } from "./document-builder.page";
import { FormFillerRoute } from "./routes";
import { SiteDocument } from "../../stores/site-document/models";
import { QuestionType } from "../../stores/site-document/models/site-document.model";

const formFillerRouteMock: Partial<FormFillerRoute> = {
  documentIds$: of([29]),
  lastDocumentId$: of(29)
}

const formFillerStoreMock: Partial<FormFillerStore> = {
  writingDocument$: new Subject<SiteDocument>(),
  submitDocument$: (action$: Observable<SiteDocument>) => of(),
  getTemplateRequest$: (action$: Observable<number>) => of()
}

export default {
  title: "Pages/Document-Builder",
  component: DocumentBuilderPage,
  argTypes: {
    document$: { control: "object" }
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: FormFillerRoute,
          useValue: formFillerRouteMock
        },
        {
          provide: FormFillerStore,
          useValue: formFillerStoreMock
        }
      ]
    })
  ]
} as Meta;

const Template: StoryFn<DocumentBuilderPage> = (args: DocumentBuilderPage) => ({
  props: args,
  styles: [`
    app-document-builder { display: contents; }
  `]
});

export const Default = Template.bind({});

const defaultDoc: SiteDocument = {
  ...defaultSiteDocument,
  DocumentTitle: faker.lorem.word(),
  Pages: [
    {
      PageID: 1,
      PageTitle: faker.lorem.word(),
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
}

Default.args = {
  document$: of<SiteDocument>(defaultDoc)
}

const docWithAllPermissionsOn: SiteDocument = {
  ...defaultSiteDocument,
  DocumentTitle: faker.lorem.word(),
  Pages: [
    {
      PageID: 1,
      PageTitle: faker.lorem.word(),
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
  MetaData: {
    ActionerText: faker.lorem.word(),
    CanBeEditableDocument: true,
    CannotAddSelfAsActioner: true,
    HasSiteList: true,
    ColourHex: faker.color.rgb({ prefix: "", casing: "upper" }),
    QueueSelectorTitle: faker.lorem.word()
  }
}

export const DocumentWithAllPermissionsTurnedOn = Template.bind({});

DocumentWithAllPermissionsTurnedOn.args = {
  document$: of<SiteDocument>(docWithAllPermissionsOn)
}