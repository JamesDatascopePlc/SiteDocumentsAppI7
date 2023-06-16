import { memoize } from "lodash-es";
import { buildStore } from "src/app/shared/rxjs";

export interface QuestionImage {
  Id: string,
  Base64: string
}

export const useQuestionImgStore = memoize(() => {
  const store = buildStore<QuestionImage>("question-images", "Id");

  return store;
});