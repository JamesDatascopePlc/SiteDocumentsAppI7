import { Store, StoreDef } from "@ngneat/elf";
import { addEntities, EntitiesRef, selectAllEntities, setEntities } from "@ngneat/elf-entities";
import { pipeTap } from "src/app/shared/rxjs";
import { Operative, OperativeSearchResult } from "../operatives.store";

interface EntitiesType {
  entities: Record<number, Operative>,
  ids: number[]
}

export function operativesAdapter<TState extends EntitiesType>(store: Store<StoreDef<TState>>) {
  return {
    operatives$: () => store.pipe(selectAllEntities()),
    addOperative: pipeTap<Operative>(operative => store.update(
      addEntities(operative)
    ))
  }
}

interface SearchEntitiesType {
  SearchResultEntities: Record<number, OperativeSearchResult>,
  SearchResultIds: number[]
}

type SearchEntitiesRef = EntitiesRef<"SearchResultEntities", "SearchResultIds", "idKeySearchResult">;

interface AdapterTarget<TState extends SearchEntitiesType> {
  store: Store<StoreDef<TState>>,
  ref: SearchEntitiesRef
}

export function operativeSearchAdapter<TState extends SearchEntitiesType>({ store, ref }: AdapterTarget<TState>) {
  return {
    searchResults$: () => store.pipe(selectAllEntities({ ref })),
    setSearchResults: pipeTap<OperativeSearchResult[]>(results => store.update(
      setEntities(results, { ref })
    ))
  }
}