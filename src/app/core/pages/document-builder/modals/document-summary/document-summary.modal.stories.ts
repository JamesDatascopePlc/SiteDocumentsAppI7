import { StorybookMeta } from ".storybook/storybook.typings";
import { DocumentSummaryModal } from "./document-summary.modal";
import { StoryFn } from "@storybook/angular";
import { defaultQuestion, defaultSection, defaultSiteDocument } from ".storybook/default";
import { QuestionType, SiteDocument } from "src/app/core/stores/site-document/models";
import { faker } from "@faker-js/faker";

export default {
  title: "Pages/Document-Builder/Modals/Document-Summary",
  component: DocumentSummaryModal,
  argTypes: {
    trigger: { name: "trigger", control: "text" },
    isOpen: { name: "isOpen", control: "boolean" },
    document: { name: "document", control: "object" },
    submit: { action: "submit" }
  }
} as StorybookMeta<DocumentSummaryModal>;

const Template: StoryFn<DocumentSummaryModal> = args => ({
  props: args
});

export const Default = Template.bind({});

const defaultDoc: SiteDocument = {
  ...defaultSiteDocument,
  DocumentTitle: faker.lorem.word(),
  RemainAnon: true,
  CurrentActionerOperativeID: 1,
  CompanyActionerId: 1,
  SiteId: 1,
  AutoQueueID: 1,
  QueueDuration: {
    Value: 6,
    Type: "Hours"
  },
  MetaData: {
    ActionerText: "Pick your actioner",
    SiteListTitle: "Pick your site"
  },
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
}

Default.args = {
  isOpen: true,
  document: defaultDoc
}