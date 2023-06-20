import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { SiteDocument } from "../stores/site-document/models";
import { memoize } from "lodash-es";
import { trackSend, track } from "src/app/shared/rxjs";
import { concat, map } from "rxjs";

export interface AddDocumentLevelImageCommand {
  documentId: number,
  base64: string,
  imageNo: number
}

export interface AddQuestionLevelImageCommand {
  fileName: string,
  siteDocumentTypeId: number,
  base64: string
}

export const useSiteDocumentApi = createApi({
  baseUrl: `${environment.siteDocsApi}/SiteDocumentApi`,
  endpoints: ({ get, post }) => ({
    getCompletedDocument: get<SiteDocument, { id: number }>("GetCompletedDocument"),
    uploadDocument: post<{ documentId: number }, { document: SiteDocument }>({ path: "UploadCompletedDocument" }),
    uploadDocumentImage: post<void, AddDocumentLevelImageCommand>({ path: "AddDocumentLevelImage" }),
    uploadQuestionImage: post<void, AddQuestionLevelImageCommand>({ path: "AddQuestionLevelImage" })
  })
});

export const useSpecificDocument = memoize((id: number) => {
  const { getCompletedDocument } = useSiteDocumentApi();

  return track(() => getCompletedDocument({ id }));
});

export const useUploadDocument = memoize(() => {
  const { uploadDocument } = useSiteDocumentApi();

  return trackSend({
    fn: (param: { document: SiteDocument }) => uploadDocument({ document: param.document }).pipe(
      map(({ documentId }) => ({
        submissionId: documentId,
        document: param.document,
        questions: param.document.Pages
          .flatMap(p => p.Sections)
          .flatMap(s => s.Questions)
      }))
    )
  })
});

export const useUploadDocumentImages = memoize(() => {
  const { uploadDocumentImage } = useSiteDocumentApi();

  return trackSend({
    fn: (params: AddDocumentLevelImageCommand[]) => {
      const uploads = params.map(p => uploadDocumentImage(p))

      return concat(...uploads);
    }
  });
});

export const useUploadQuestionImages = memoize(() => {
  const { uploadQuestionImage } = useSiteDocumentApi();

  return trackSend({
    fn: (params: AddQuestionLevelImageCommand[]) => {
      const uploads = params.map(p => uploadQuestionImage(p))
    
      return concat(...uploads);
    }
  });
});