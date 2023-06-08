import { memoize } from "lodash-es";
import { use } from "src/app/shared/rxjs";

export interface Asset {
  Id : number,
  TypeName: string,
  Registration: string | null
}

export interface AssetGroup {
  GroupId: number,
  GroupName: string,
  SiteId: number
  Types: AssetType[]
}

export interface AssetType {
  Id: number,
  Description: string,
  GroupId: number
}

export interface AssetInspectionSchedule {
  ScheduleID: number,
  ScheduleName: string
}

// @Injectable({ providedIn: "root" })
// class AssetStore {
//   assets = use<Asset[]>([]);
//   async mutate(mutation: (assets: Asset[]) => Asset[]) {
//     const assets = await lastValueFrom(this.assets());
//     this.assets.next(mutation(assets));
//   }
// }

export const useAssetStore = memoize(() => use<Asset[]>([]));