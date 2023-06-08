import { environment } from "src/environments/environment";
import { Area, Company, Site } from "../stores/user/user.store";
import { createApi } from "./create-api";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { CategoryActioner } from "../stores/category-actioners/category-actioners.store";

export type AspNetData<T> = {
  [name in keyof T]: T[name] extends Date | undefined | null 
    ? string 
    : T[name] 
}

export interface RamsItem {
  Reference: string,
  Description: string,
  SiteId: number,
  ExpiryDate: Date | null
}

@Injectable({ providedIn: "root" })
export class LoginApi {
  http = inject(HttpClient);
  
  getSites() {
    return this.http.get<Site[]>(`${environment.siteDocsApi}/LoginApi/GetSites`);
  }

  getCompanies() {
    return this.http.get<Company[]>(`${environment.siteDocsApi}/LoginApi/GetCompanies`);
  }

  getAreas() {
    return this.http.get<Area[]>(`${environment.siteDocsApi}/LoginApi/GetAreas`);
  }

  getRams() {
    return this.http.get<AspNetData<RamsItem>[]>(`${environment.siteDocsApi}/LoginApi/GetRams`).pipe(
      map(items => items.map(item => 
          ({
            ...item,
            ExpiryDate: item.ExpiryDate != null 
              ? new Date(item.ExpiryDate)
              : null
          })
        )
      )
    );
  }
}

export const useLoginApi = createApi({
  baseUrl: `${environment.siteDocsApi}/LoginApi`,
  endpoints: ({ get }) => ({
    getSites: get<Site[]>("GetSites"),
    getAreas: get<Area[]>("GetAreas"),
    getRams: get<RamsItem[]>("GetRams"),
    getCategoryActioners: get<CategoryActioner[], { siteId: number }>("GetCategoryActioners")
  })
});