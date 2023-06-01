import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";

export interface OperativeSearchParams {
  search: string,
  noAppLimit: boolean,
  siteId?: number
}

export interface OperativeSearchResult {
  ID: number,
  Name: string,
  CompanyName: string,
  HasQRCode: boolean,
  HasAppAccess: boolean
}

@Injectable({ providedIn: "root" })
export class OperativeApi {
  http = inject(HttpClient);

  getOperativesByName(params: OperativeSearchParams) {
    return this.http.get<OperativeSearchResult[]>(`${environment.siteDocsApi}/OperativeApi/GetOperativesByName`, {
      params: {
        search: params.search,
        noAppLimit: params.noAppLimit,
        siteId: params.siteId?.toString() || "null"
      }
    })
  }
}