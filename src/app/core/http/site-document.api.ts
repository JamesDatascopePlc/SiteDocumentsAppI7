import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { SiteDocument } from "../stores/site-document/models";
//import { memoize } from "lodash-es";

export const useSiteDocumentApi = createApi({
  baseUrl: `${environment.siteDocsApi}/SiteDocumentApi`,
  endpoints: ({ post }) => ({
    uploadDocument: post<{ documentId: number }, SiteDocument>({ path: "UploadSiteDocument" })
  })
});

//export const useUploadDocument = memoize();