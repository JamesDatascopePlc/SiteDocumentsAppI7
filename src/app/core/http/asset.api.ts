import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Asset } from "../stores/asset/asset.store";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AssetApi {
  protected httpClient = inject(HttpClient);

  getAssetByRegistration(params: { searchRegistration: string }) {
    return this.httpClient.get<Asset[]>(`${environment.siteDocsApi}/AssetApi/GetAssetsByReg`, {
      params: {
        searchString: params.searchRegistration
      }
    });
  }
}