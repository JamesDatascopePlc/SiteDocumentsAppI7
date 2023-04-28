import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { map } from "rxjs";

export interface CategoryActioner {
  Id: number,
  Name: string,
  CategoryId: number
}

const store = createStore(
  { name: "site-documents" },
  withEntities<CategoryActioner, "Id">({ idKey: "Id" })
);

@Injectable({ providedIn: "root" })
export class CategoryActionersStore {
  http = inject(HttpClient);

  categoryActioners$ = store.pipe(selectAllEntities());
  categoryActionersById$ = (categoryId: number) => this.categoryActioners$.pipe(
    map(catActioners => catActioners.filter(ca => ca.CategoryId === categoryId))
  );

  downloadCategoryActioners$ = (siteId: number) => this.http.get<CategoryActioner[]>("api/LoginApi/GetCategoryActioners", {
    params: {
      siteId: siteId.toString()
    }
  });
}
