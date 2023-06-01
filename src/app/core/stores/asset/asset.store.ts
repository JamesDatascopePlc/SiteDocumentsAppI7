import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";

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

const store = createStore(
  { name: "assets" },
  withEntities<Asset, "Id">({ idKey: "Id" })
);

@Injectable({ providedIn: "root" })
export class AssetStore {
  assets$ = store.pipe(selectAllEntities());
}
