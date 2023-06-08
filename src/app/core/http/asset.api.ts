import { Asset } from "../stores/asset/asset.store";
import { environment } from "src/environments/environment";
import { createApi } from "./create-api";

export interface GetAssetByRegistrationParams {
  searchString: string
}

export const useAssetApi = createApi({
  baseUrl: `${environment.siteDocsApi}/AssetApi`,
  endpoints: ({ get }) => ({
    getAssetByRegistration: get<Asset[], GetAssetByRegistrationParams>("GetAssetsByReg")
  })
});