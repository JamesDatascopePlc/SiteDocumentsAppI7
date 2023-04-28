import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { map } from "rxjs";

export interface ResponsibilityArea {
  Id: number,
  Name: string,
  DocResAreaTypeId: number,
  SiteId?: number
}

export interface ResponsibilityAreaType {
  Id: number,
  TypeName: string,
  AppQuestionText: string,
  Areas: ResponsibilityArea[]
}

const store = createStore(
  { name: "responsibility-area-types" },
  withEntities<ResponsibilityAreaType, "Id">({ idKey: "Id" })
);

@Injectable({ providedIn: "root" })
export class ResponsibilityAreaTypesStore {
  responsibilityAreaTypes$ = store.pipe(selectAllEntities());
  responsibilityAreaTypeById$ = (id: number) => this.responsibilityAreaTypes$.pipe(
    map(resAreaTypes => resAreaTypes.find(t => t.Id === id))
  );
}
