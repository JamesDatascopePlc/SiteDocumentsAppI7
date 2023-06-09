import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { dependencyTrack } from "src/app/shared/rxjs/track";

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

export const useOperativeApi = createApi({
  baseUrl: `${environment.siteDocsApi}/OperativeApi`,
  endpoints: ({ get }) => ({
    getOperativesByName: get<OperativeSearchResult[], OperativeSearchParams>("GetOperativesByName")
  })
});

export const useFetchOperativesByName = memoize((binding: () => OperativeSearchParams) => {
  const { getOperativesByName } = useOperativeApi();

  return dependencyTrack({
    binding,
    fn: params => getOperativesByName(params)
  })
});