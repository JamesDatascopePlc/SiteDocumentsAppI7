import { PointGroup } from "signature_pad";

export interface SiteDocument {
  DocumentID: number;
  DocumentTitle: string;
  Subtitle: string;
  Preamble: string;
  Pinned: boolean;
  Pages: Page[];
  AllowAnon: boolean;
  RemainAnon: boolean;
  Queues: Queue[],
  DocumentGroup: string;
  DocumentCategory?: number;
  CanCreateHotspot: boolean;
  CanBeAddedToHotspot?: boolean;
  CanBeSavedAsDraft?: boolean;
  CanAddActionerFromApp: boolean;
  CanAddCategoryActioner: boolean;
  CanCreateAssetsFromDocument: boolean;
  CanHaveQueueDuration: boolean;
  CanHaveDocumentLevelImages: boolean;
  CanHaveDocLevelPhotoRoll: boolean;
  CurrentActionerOperativeID?: number;
  CompanyActionerId?: number;
  ShowDocLevelPhotoButtonAtStartOfDoc: boolean;
  CanAddAsset?: boolean;
  CanAddOperative?: boolean;
  CanHaveCompanyActioner: boolean;
  MetaData: Partial<SiteDocumentMetaData>;
  SiteDocumentType: number,
  SiteId?: number;
  AutoQueueID?: number;
  QueueDuration?: QueueDuration;
  DocumentResponsibilityAreaTypeId?: number;
  DocumentResponsibilityAreaId?: number;
  ReqGps: boolean;
  PageIdx: number
}

export interface Queue {
  Id: number,
  Name: string
}

export interface QueueDuration {
  Value: number;
  Type: "Mins" | "Hours" | "Days";
}

export interface SiteDocumentImage {
  Id: string,
  DocumentId: number,
  Base64: string,
}

export interface SiteDocumentMetaData {
  ActionerText: string;
  CanBeEditableDocument: boolean;
  CannotAddSelfAsActioner: boolean;
  ColourHex: string;
  QueueSelectorTitle: string;
  HasSiteList: boolean;
  SiteListTitle: string;
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
  PageNo: number;
  Sections: Section[];
  Hidden: boolean;
}

export interface Section {
  SectionID: number;
  SectionNo: number;
  SectionTitle: string;
  Questions: Question[];
  SectionQuestiontype: QuestionType;
  IsRepeatable: boolean;
  TableTitles: string[];
  Hidden: boolean;
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
  HraSelect = 34,
  MultiCheckbox = 35,
  LinkedDateAndTime = 36
}

export interface Question {
  QuestionID: number;
  QuestionText: string;
  CascadeOptionsText: string;
  CommentsText: string;
  Assets: SiteDocumentAsset[];
  Operatives: SiteDocumentOperative[];
  Required: boolean;
  AnswerText: string;
  MoreAdditionalText?: string;
  DateAndTime: Nullable<Date>;
  DateAndTime2: Nullable<Date>;
  NumberVal?: number;
  OptionVal?: string | null;
  SelectedOptionText?: Nullable<string>;
  SelectedCascadeOptionText?: Nullable<string>;
  File?: Nullable<string>;
  Img?: Nullable<string>;
  AnswerOptions: SelectOption[];
  CascadeOptions: CascadeOption[];
  CascadeOptionVal?: string | null;
  YesNoNA: boolean | null;
  CanHaveImg: boolean;
  CanHaveFiles: boolean;
  CanUsePhotoLib: boolean;
  SignatureArray?: number[];
  SignaturePoints?: PointGroup[];
  SignatureDataUrl?: string;
  ValidationData: ValidationData[];
  Hidden: boolean;
}

export interface ValidationData {
  Key: "Min" | "Max",
  Value: string,
  Msg: string
}

export interface SelectOption {
  Active?: boolean;
  Text: string;
  Val: string;
  MetaData?: any;
  OptionsMetadataJson?: string;
}

export interface SelectOptionMetaData {
  ColourHex?: string;
}

export interface CascadeOption { 
  ParentVal: string, 
  Text: string, 
  Val: string 
}