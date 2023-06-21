import { faker } from "@faker-js/faker";
import { Question, QuestionType, Section, SiteDocument } from "src/app/core/stores/site-document/models";

export const defaultSiteDocument: SiteDocument = {
  DocumentID: 1,
  SiteDocumentType: 1,
  DocumentTitle: "",
  DocumentGroup: "",
  Subtitle: "",
  Preamble: "",
  Pages: [],
  Queues: [],
  CanAddAsset: false,
  CanAddOperative: false,
  CanCreateHotspot: false,
  CanAddActionerFromApp: false,
  CanAddCategoryActioner: false,
  CanCreateAssetsFromDocument: false,
  CanHaveCompanyActioner: false,
  CanHaveDocLevelPhotoRoll: false,
  CanHaveDocumentLevelImages: false,
  CanHaveQueueDuration: false,
  ShowDocLevelPhotoButtonAtStartOfDoc: false,
  CanBeAddedToHotspot: false,
  CanBeSavedAsDraft: false,
  Pinned: false,
  AllowAnon: false,
  RemainAnon: false,
  ReqGps: false,
  MetaData: {},
  PageIdx: 1
}

export const defaultSection: Section = {
  SectionID: 1,
  SectionNo: 1,
  SectionTitle: faker.lorem.word(),
  Questions: [],
  SectionQuestiontype: QuestionType.Label,
  IsRepeatable: false,
  Hidden: false,
  TableTitles: [
    "Yes",
    "No",
    "N/A",
    "Text"
  ]
}

export const defaultQuestion: Question = {
  QuestionID: 1,
  QuestionText: faker.lorem.word(),
  CommentsText: faker.lorem.word(),
  SelectedOptionText: faker.lorem.word(),
  CascadeOptionsText: faker.lorem.word(),
  MoreAdditionalText: faker.lorem.paragraph(),
  SelectedCascadeOptionText: faker.lorem.word(),
  NumberVal: +faker.random.numeric(2),
  Required: true,
  Hidden: false,
  Assets: Array
    .from({ length: 3 })
    .map((val, idx) => 
    ({
      AssetID: idx,
      Tag: faker.random.alphaNumeric(5),
      Name: faker.lorem.word(),
      QRCode: "",
      TemplateID: 1
    })
  ),
  Operatives: Array
    .from({ length: 3 })
    .map((val, idx) => 
    ({
      AttendeeID: idx,
      Name: faker.name.fullName(),
      DateAttended: new Date()
    })
  ),
  CanHaveImg: true,
  CanHaveFiles: true,
  AnswerText: "",
  DateAndTime: new Date(),
  DateAndTime2: new Date(),
  AnswerOptions: [],
  CascadeOptions: [],
  YesNoNA: null,
  ValidationData: []
}