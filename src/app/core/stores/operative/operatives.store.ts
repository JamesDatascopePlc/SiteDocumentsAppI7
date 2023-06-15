import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { memoize } from "lodash-es";
import { createPipe } from "src/app/shared/rxjs";

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
    data: createPipe(store.pipe(selectAllEntities())),
    update: store.update.bind(store)
  }
});