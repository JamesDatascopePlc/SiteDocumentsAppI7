import { Question } from "src/app/core/stores/site-document/site-document.store";

export const defaultQuestion: Question = {
  QuestionID: 1,
  QuestionText: "",
  CascadeOptionsText: "",
  Required: true,
  Assets: [],
  Operatives: [],
  CanHaveImg: true,
  CanHaveFiles: true,
  AnswerText: ""
}