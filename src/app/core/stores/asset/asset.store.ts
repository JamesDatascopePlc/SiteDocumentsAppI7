import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { memoize } from "lodash-es";

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

export const useAssetStore = memoize(() => {
  const store = createStore(
    { name: "assets" },
    withEntities<Asset, "Id">({ idKey: "Id" })
  );

  return {
    data: store.pipe(selectAllEntities()).toPipe(),
    update: store.update.bind(store)
  }
});