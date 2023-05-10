import { Store, StoreDef } from "@ngneat/elf";
import { entitiesPropsFactory, selectAllEntities, setEntities } from "@ngneat/elf-entities";
import { pipeTap } from "../rxjs";

const { SearchResultEntitiesRef, withSearchResultEntities } = entitiesPropsFactory("SearchResult")

export interface SearchEntitiesType<TResult> {
  SearchResultEntities: Record<number, TResult>,
  SearchResultIds: number[]
}

function searchResultsAdapt<TResult, TState extends SearchEntitiesType<TResult>>(store: Store<StoreDef<TState>>) {
  return {
    searchResults$: () => store.pipe(selectAllEntities({ ref: SearchResultEntitiesRef })),
    setSearchResults: pipeTap<TResult[]>(results => store.update(
      setEntities(results, { ref: SearchResultEntitiesRef })
    ))
  }
}

export function searchResultsAdapter() {
  return {
    SearchResultEntitiesRef,
    withSearchResultEntities,
    searchResultsAdapt
  }
}