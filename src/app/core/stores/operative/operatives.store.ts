import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { memoize } from "lodash-es";

export interface Operative {
  ID: number,
  Name: string
}

export const useOperativeStore = memoize(() => {
  const store = createStore(
    { name: "operatives" },
    withEntities<Operative, "ID">({ idKey: "ID" })
  );

  return {
    data: store.pipe(selectAllEntities()).toPipe(),
    update: store.update.bind(store)
  }
});