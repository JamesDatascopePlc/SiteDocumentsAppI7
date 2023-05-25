import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";

export interface Asset {
  Id : number,
  TypeName: string,
  Registration: string | null
}

const store = createStore(
  { name: "assets" },
  withEntities<Asset, "Id">({ idKey: "Id" })
);

@Injectable({ providedIn: "root" })
export class AssetStore {
  assets$ = store.pipe(selectAllEntities());
}
