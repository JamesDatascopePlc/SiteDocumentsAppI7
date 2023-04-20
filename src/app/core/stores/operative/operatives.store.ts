import { Injectable, inject } from "@angular/core"
import { createStore } from "@ngneat/elf";
import { addEntities, withEntities } from "@ngneat/elf-entities";
import { localStorageStrategy, persistState } from "@ngneat/elf-persist-state";
import { searchResultsAdapter } from "src/app/shared/adapters/search-results.adapter";
import { operativesAdapter } from "./adapters/operatives.adapter";
import { Observable, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { createRequestsStatusOperator, selectIsRequestPending, updateRequestStatus, withRequestsStatus } from "@ngneat/elf-requests";

export interface Operative {
  ID: number,
  Name: string
}

export interface OperativeSearchParams {
  search: string,
  noAppLimit: boolean,
  siteId?: number
}

export interface OperativeSearchResult {
  ID: number,
  Name: string,
  CompanyName: string,
  HasQRCode: boolean,
  HasAppAccess: boolean
}

const {
  SearchResultEntitiesRef,
  withSearchResultEntities,
  searchResultsAdapt
} = searchResultsAdapter();

const store = createStore(
  { name: "operatives" },
  withEntities<Operative, "ID">({ idKey: "ID" }),
  withSearchResultEntities<OperativeSearchResult, "ID">({ idKey: "ID" }),
  withRequestsStatus<"operativesSearch">()
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

const trackRequestStatus = createRequestsStatusOperator(store);

persistState(store, {
  key: "operatives",
  storage: localStorageStrategy
});

@Injectable({ providedIn: "root" })
export class OperativesStore {
  httpClient = inject(HttpClient);

  operatives$ = operatives$();
  searchResults$ = searchResults$();
  searchResultsIsPending$ = store.pipe(selectIsRequestPending("operativesSearch"));

  addOperative = addOperative;
  setSearchResults = setSearchResults;

  getSearchResults = (action$: Observable<OperativeSearchParams>) => action$.pipe(
    switchMap(params => this.httpClient.get<OperativeSearchResult[]>(`${environment.siteDocsApi}/OperativeApi/GetOperativesByName`, {
      params: {
        search: params.search,
        noAppLimit: params.noAppLimit,
        siteId: params.siteId?.toString() || "null"
      }
    })),
    trackRequestStatus("operativesSearch"),
    tap(searchResults => store.update(
      addEntities(searchResults, { ref: SearchResultEntitiesRef }),
      updateRequestStatus("operativesSearch", "success")
    ))
  );
}