import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";

export function buildStore<TEntity extends { [P in TId]: PropertyKey }, TId extends keyof TEntity & string = keyof TEntity & string>(name: string, idKey: TId) {
  const store = createStore(
    { name },
    withEntities<TEntity, TId>({ idKey })
  );

  return {
    data: store.pipe(selectAllEntities()).toPipe(),
    update: store.update.bind(store)
  }
}