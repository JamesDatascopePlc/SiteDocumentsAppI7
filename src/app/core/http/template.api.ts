import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SiteDocument } from "../stores/site-document/models";
import { environment } from "src/environments/environment";
import { EMPTY, Subject, expand, map, mergeMap, reduce } from "rxjs";
import { memoize, orderBy } from "lodash-es";
import { createApi } from "./create-api";
import { track } from "src/app/shared/rxjs";
import { Function } from "src/app/shared/types";
import { dependencyTrack } from "src/app/shared/rxjs/track";

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

export const useTemplate = memoize((binding: Function<{ id: number }>) => {
  const { getTemplate } = useTemplateApi();

  return dependencyTrack({
    binding,
    fn: (params) => getTemplate(params)
  })
});