import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { createPipe } from "./use";

export function store<TEntity extends { [P in TId]: PropertyKey; }, TId extends string>(name: string, idKey: TId) {
  const store = createStore(
    { name },
    withEntities<TEntity, TId>({ idKey: idKey })
  );

  return {
    data: createPipe(store.pipe(selectAllEntities())),
    update: store.update.bind(store)
  }
}