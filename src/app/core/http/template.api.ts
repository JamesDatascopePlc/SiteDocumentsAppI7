import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SiteDocument } from "../stores/site-document/models";
import { environment } from "src/environments/environment";
import { EMPTY, Observable, expand, map, of, reduce, switchMap } from "rxjs";
import { memoize, orderBy } from "lodash-es";
import { createApi } from "./create-api";
import { track } from "src/app/shared/rxjs";
import { param } from "src/app/shared/route";

export interface TemplateItem {
  Id: number,
  Title: string
}

export interface PaginatedList<T> {
  Items: T[],
  PageNumber: number,
  TotalPage: number,
  TotalCount: number,
  HasPreviousPage: boolean,
  HasNextPage: boolean
}

@Injectable({
  providedIn: "root"
})
export class TemplateApi {
  protected httpClient = inject(HttpClient);

  getTemplates() {
    return this.httpClient.get<PaginatedList<SiteDocument>>(`${environment.siteDocsApi}/TemplateApi/GetLatestTemplatesWithPagination`, {
      params: {
        pageNumber: 1,
        pageSize: 20
      }
    }).pipe(
      expand((res, idx) => res.HasNextPage
        ? this.httpClient.get<PaginatedList<SiteDocument>>(`${environment.siteDocsApi}/TemplateApi/GetLatestTemplatesWithPagination`, {
          params: {
            pageNumber: idx + 2,
            pageSize: 20
          }
        })
        : EMPTY
      ),
      map(res => res.Items),
      reduce((acc, docs) => [...acc, ...docs]),
      map(tpls => orderBy(tpls, "DocumentTitle"))
    )
  }

  getTemplate(params: { id: number }) {
    return this.httpClient.get<SiteDocument>(`${environment.siteDocsApi}/TemplateApi/GetDocumentTemplate`, {
      params: {
        id: params.id.toString()
      }
    });
  }
}

export const useTemplateApi = createApi({
  baseUrl: `${environment.siteDocsApi}/TemplateApi`,
  endpoints: ({ get }) => ({
    getAllTemplates: get<TemplateItem[]>("GetAllTemplates"),
    getTemplate: get<SiteDocument, { id: number }>("GetDocumentTemplate"),
  })
});

export const useAllTemplates = memoize(() => {
  const { getAllTemplates } = useTemplateApi();

  return track(() => getAllTemplates());
});

export const useTemplate = (id$: Observable<Nullable<number>>) => {
  const { getTemplate } = useTemplateApi();
  const loginId = param("loginId") || 0;

  return track(() => id$.pipe(
    switchMap(id => id != null 
      ? getTemplate({ id }).pipe(
        map(doc => ({
          ...doc,
          Images: [],
          GroupedDocumentID: `${loginId}_${Date.now()}`,
          QueueDuration: doc.CanHaveQueueDuration 
            ? { Value: 0, Type: "Mins" }
            : null,
          PageIdx: 1
        }) as SiteDocument)
      )
      : of(null)
    )
  ));
};