import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SiteDocument } from "../stores/site-document/models";
import { environment } from "src/environments/environment";
import { EMPTY, expand, map, reduce } from "rxjs";
import { orderBy } from "lodash-es";

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