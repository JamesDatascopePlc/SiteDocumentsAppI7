export interface SiteDocument {
  DocumentID: number;
  DocumentTitle: string;
  Pinned: boolean;
  Pages: Page[];
  AllowAnon: boolean;
  RemainAnon: boolean;
  Queues: { Key: string, Value: string }[],
  DocumentGroup: string;
  CanCreateHotspot: boolean;
  CanBeAddedToHotspot?: boolean;
  CanBeSavedAsDraft?: boolean;
  CanAddActionerFromApp: boolean;
  CanAddCategoryActioner: boolean;
  CanCreateAssetsFromDocument: boolean;
  CanHaveQueueDuration: boolean;
  CanHaveDocumentLevelImages: boolean;
  CanHaveDocLevelPhotoRoll: boolean;
  ShowDocLevelPhotoButtonAtStartOfDoc: boolean;
  CanAddAsset?: boolean;
  CanAddOperative?: boolean;
  CanHaveCompanyActioner: boolean;
  MetaData: Partial<SiteDocumentMetaData>;
}

export interface SiteDocumentMetaData {
  ActionerText: string;
  CanBeEditableDocument: boolean;
  CannotAddSelfAsActioner: boolean;
  ColourHex: string;
  QueueSelectorTitle: string;
  HasSiteList: boolean;
  UsesRadioGroupTable: boolean;
}

export interface SiteDocumentAsset {
  AssetID: number;
  Tag: string;
  Name: string;
  QRCode?: string;
  TemplateID?: number;
}

export interface SiteDocumentOperative {
  AttendeeID: number;
  Name: string;
  DateAttended: Date;
}

export interface Page {
  PageID: number;
  PageTitle: string;
  Sections: Section[]
}

export interface Section {
  SectionID: number;
  SectionNo: number;
  SectionTitle: string;
  Questions: Question[];
  SectionQuestiontype: QuestionType;
  IsRepeatable: boolean;
  TableTitles: string[];
}

export enum QuestionType {
  Label = 0,
  Checkbox = 1,
  RadioGroup = 2,
  Textbox = 3,
  TextArea = 4,
  Select = 5,
  CheckboxTextbox = 6,
  RadioGroupTextbox = 7,
  Date = 8,
  DateTime = 9,
  OperativeList = 10,
  WallOfText = 11,
  Number = 12,
  CascadeDropdown = 13,
  LinkedBool = 16,
  AssetList = 17,
  LinkedDates = 18,
  Signature = 19,
  CompanySelect = 21,
  AreaSelect = 22,
  AssetGroupsAndTypes = 25,
  AssetInspectionSchedule = 26,
  ProjectSelect = 27,
  RamsSelect = 28,
  SelectText = 29,
  CascadeDropdownText = 30,
  MultiCascade = 31,
  Time = 32,
  LinkedTimes = 33,
  HRASelect = 34,
  MultiCheckbox = 35,
  LinkedDateAndTime = 36
}

export interface Question {
  QuestionID: number;
  QuestionText: string;
  CascadeOptionsText: string;
  Assets: SiteDocumentAsset[];
  Operatives: SiteDocumentOperative[];
  Required: boolean;
  AnswerText: string;
  YesNoNA: boolean | null;
  CanHaveImg: boolean;
  CanHaveFiles: boolean;
}