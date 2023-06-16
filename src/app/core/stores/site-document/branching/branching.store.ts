import { memoize } from "lodash-es";
import { buildStore } from "src/app/shared/rxjs";

export const useBranchingStore = memoize(() => {
  const store = buildStore<{ documentId: number, hideIdxs: number[] }, "documentId">("branching", "documentId");

  return store;
});