import { Asset } from "../stores/asset/asset.store";
import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { track } from "src/app/shared/rxjs";
import { dependencyTrack } from "src/app/shared/rxjs";
import { startWith } from "rxjs";

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

export interface AssetInspectionSchedule {
  ScheduleID: number;
  ScheduleName: string;
  Active: boolean;
}

export const useAssetApi = createApi({
  baseUrl: `${environment.siteDocsApi}/AssetApi`,
  endpoints: ({ get }) => ({
    getAssetsByRegistration: get<Asset[], GetAssetsByRegistrationParams>("GetAssetsByReg"),
    getAssetsByType: get<Asset[], GetAssetsByTypeParams>("getAssetsByType"),
    getAssetGroups: get<AssetGroup[]>("GetAssetGroups"),
    getAssetTypes: get<AssetType[]>("GetAssetTypes"),
    getAssetInspectionSchedules: get<AssetInspectionSchedule[]>("GetAssetInspectionSchedules")
  })
});

export const useFetchAssetsByRegistration = memoize((binding: Func<GetAssetsByRegistrationParams>) => {
  const { getAssetsByRegistration } = useAssetApi();

  return dependencyTrack({
    binding,
    fn: params => getAssetsByRegistration(params)
  });
})

export const useFetchAssetsByType = memoize((binding: Func<Partial<GetAssetsByTypeParams>>) => {
  const { getAssetsByType } = useAssetApi();

  return dependencyTrack({
    binding,
    fn: params => getAssetsByType(params as GetAssetsByTypeParams)
  })
});

export const useAssetGroups = memoize(() => {
  const { getAssetGroups } = useAssetApi();

  return track(() => getAssetGroups().pipe(
    startWith([])
  ));
});

export const useAssetTypes = memoize(() => {
  const { getAssetTypes } = useAssetApi();

  return track(() => getAssetTypes().pipe(
    startWith([])
  ));
});

export const useAssetInspectionSchedules = memoize(() => {
  const { getAssetInspectionSchedules } = useAssetApi();

  return track(() => getAssetInspectionSchedules());
});