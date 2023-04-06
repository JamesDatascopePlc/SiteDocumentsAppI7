import { Injectable } from "@angular/core"
import { createStore } from "@ngneat/elf";
import { entitiesPropsFactory, withEntities } from "@ngneat/elf-entities";
import { localStorageStrategy, persistState } from "@ngneat/elf-persist-state";
import { searchResultsAdapter } from "src/app/shared/adapters/search-results.adapter";
import { operativesAdapter, operativeSearchAdapter } from "./adapters/operatives.adapter";

export interface Operative {
  ID: number,
  Name: string
}

export interface OperativeSearchResult {
  ID: number,
  Name: string,
  CompanyName: string,
  HasQRCode: boolean,
  HasAppAccess: boolean
}

const {
  withSearchResultEntities,
  searchResultsAdapt
} = searchResultsAdapter();

const store = createStore(
  { name: "operatives" },
  withEntities<Operative, "ID">({ idKey: "ID" }),
  withSearchResultEntities<OperativeSearchResult, "ID">({ idKey: "ID" })
);

const { 
  operatives$, 
  addOperative,
  searchResults$,
  setSearchResults
} = {
  ...operativesAdapter(store),
  ...searchResultsAdapt(store)
}

persistState(store, {
  key: "operatives",
  storage: localStorageStrategy
});

@Injectable({ providedIn: "root" })
export class OperativesStore {
  operatives$ = operatives$();
  searchResults$ = searchResults$();

  addOperative = addOperative;
  setSearchResults = setSearchResults;
}