import { Asset } from "../stores/asset/asset.store";
import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { track } from "src/app/shared/rxjs";
import { trackSend } from "src/app/shared/rxjs";
import { of } from "rxjs";

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

export interface Detail {
  Title: string,
}

export interface DetailListItem {
  Content: string;
}

export interface GetAssetDetailsByAssetIdQuery {
  id: number;
}

export interface GetAssetDetailsByTagQuery {
  tag: string;
}

export interface DetailsListItem {
  Icon: string;
  CssClass: string;
  Content: string;
  Date: Date;
  IconStyle: { [key: string]: string };
  Id: number;
  StringId?: string;
  ListItemType: string;
}

export interface DetailsList {
  Title: string;
  ListItems: DetailsListItem[];
}

export interface AssetInfo {
  ID: number;
  AssetID: string;
  AcquiredDate: Date;
  DateOnSite: Date;
  DateOffHired: Date;
  TypeName: string;
  Registration: string;
  QRCode: string;
  SiteID: number;
  AssetFileName: string;
  DetailsLists: DetailsList[];
  Base64Img: Nullable<string>;
  PurchaseValue: string;
  AssetNotes: string;
  Location: string;
  TemplateIDs: number[];
}

export const useAssetApi = createApi({
  baseUrl: `${environment.siteDocsApi}/AssetApi`,
  endpoints: ({ get }) => ({
    getAssetDetailsByAssetId: get<AssetInfo, GetAssetDetailsByAssetIdQuery>("AssetDetailsByAssetId"),
    getAssetDetailsByTag: get<AssetInfo, GetAssetDetailsByTagQuery>("AssetDetailsByTag"),
    getAssetsByRegistration: get<Asset[], GetAssetsByRegistrationParams>("GetAssetsByReg"),
    getAssetsByType: get<Asset[], GetAssetsByTypeParams>("getAssetsByType"),
    getAssetGroups: get<AssetGroup[]>("GetAssetGroups"),
    getAssetTypes: get<AssetType[]>("GetAssetTypes"),
    getAssetInspectionSchedules: get<AssetInspectionSchedule[]>("GetAssetInspectionSchedules")
  })
});

export const useAssetDetailsById = memoize((assetId: Nullable<number>) => {
  const { getAssetDetailsByAssetId } = useAssetApi();

  return track(() => assetId != null
    ? getAssetDetailsByAssetId({ id: assetId })
    : of(null)
  )
});

export const useAssetDetailsByTag = memoize((tag: Nullable<string>) => {
  const { getAssetDetailsByTag } = useAssetApi();

  return track(() => tag != null 
    ? getAssetDetailsByTag({ tag }) 
    : of(null)
  );
})

export const useFetchAssetsByRegistration = memoize((binding: Func<GetAssetsByRegistrationParams>) => {
  const { getAssetsByRegistration } = useAssetApi();

  return trackSend({
    binding,
    fn: params => getAssetsByRegistration(params)
  });
})

export const useFetchAssetsByType = memoize((binding: Func<Partial<GetAssetsByTypeParams>>) => {
  const { getAssetsByType } = useAssetApi();

  return trackSend({
    binding,
    fn: params => getAssetsByType(params as GetAssetsByTypeParams)
  })
});

export const useAssetGroups = memoize(() => {
  const { getAssetGroups } = useAssetApi();

  const assetGroups = track(() => getAssetGroups());

  return {
    ...assetGroups,
    options: assetGroups.data(groups => groups.map(g => 
      ({
        GroupId: g.GroupID.toString(),
        GroupName: g.GroupName
      })
    ))
  }
});

export const useAssetTypes = memoize(() => {
  const { getAssetTypes } = useAssetApi();

  const assetTypes = track(() => getAssetTypes());

  return {
    ...assetTypes,
    options: assetTypes.data(types => types.map(t => 
      ({
        Id: t.Id.toString(),
        Description: t.Description
      })
    ))
  }
});

export const useAssetInspectionSchedules = memoize(() => {
  const { getAssetInspectionSchedules } = useAssetApi();

  const inspectionSchedules = track(() => getAssetInspectionSchedules());

  return {
    ...inspectionSchedules,
    options: inspectionSchedules.data(schedules => schedules.map(s => 
      ({
        ScheduleId: s.ScheduleID.toString(),
        ScheduleName: s.ScheduleName
      })
    ))
  }
});