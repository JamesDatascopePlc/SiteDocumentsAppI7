import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { trackSend } from "src/app/shared/rxjs";

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

  return trackSend({
    binding,
    fn: params => getOperativesByName(params)
  })
});