import { Asset } from "../stores/asset/asset.store";
import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { Function } from "src/app/shared/types";
import { track } from "src/app/shared/rxjs";
import { dependencyTrack } from "src/app/shared/rxjs/track";

export interface GetAssetsByRegistrationParams { 
  searchString: string, 
  siteId?: number 
}

export interface GetAssetsByTypeParams { 
  typeId: number, 
  siteId?: number 
}

export interface AssetGroup {
  GroupID: number,
  GroupName: string,
  SiteID: number
}

export interface AssetType {
  Id: number,
  Description: string,
  GroupID: number
}

export const useAssetApi = createApi({
  baseUrl: `${environment.siteDocsApi}/AssetApi`,
  endpoints: ({ get }) => ({
    getAssetsByRegistration: get<Asset[], GetAssetsByRegistrationParams>("GetAssetsByReg"),
    getAssetsByType: get<Asset[], GetAssetsByTypeParams>("getAssetsByType"),
    getAssetGroups: get<AssetGroup[]>("GetAssetGroups"),
    getAssetTypes: get<AssetType[]>("GetAssetTypes")
  })
});

export const useFetchAssetsByRegistration = memoize((binding: Function<GetAssetsByRegistrationParams>) => {
  const { getAssetsByRegistration } = useAssetApi();

  return dependencyTrack({
    binding,
    fn: params => getAssetsByRegistration(params)
  });
})

export const useFetchAssetsByType = memoize((binding: Function<GetAssetsByTypeParams>) => {
  const { getAssetsByType } = useAssetApi();

  return dependencyTrack({
    binding,
    fn: params => getAssetsByType(params)
  })
});

export const useAssetGroups = memoize(() => {
  const { getAssetGroups } = useAssetApi();

  return track(() => getAssetGroups());
});

export const useAssetTypes = memoize(() => {
  const { getAssetTypes } = useAssetApi();

  return track(() => getAssetTypes());
});