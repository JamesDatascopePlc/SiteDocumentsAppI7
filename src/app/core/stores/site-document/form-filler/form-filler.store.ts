import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { entitiesPropsFactory } from "@ngneat/elf-entities";
import { Observable, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { withWritingDocument } from "../props";
import { writingDocumentAdapter } from "../adapters/writing-document.adapter";
import { SiteDocument } from "../models";

export interface TemplateMenuItem {
  Id: number;
  Title: string;
  SiteDocumentType: number;
  RevNo: number;
}

const { withTemplateMenuEntities } = entitiesPropsFactory("templateMenu");

const store = createStore(
  { name: "form-filler" },
  withWritingDocument(null as SiteDocument | null),
  withTemplateMenuEntities<TemplateMenuItem, "Id">({ idKey: "Id", initialValue: [] })
);

const { 
  selectWritingDocument, 
  setWritingDocument 
} = writingDocumentAdapter(store);

@Injectable({ providedIn: "root" })
export class FormFillerStore {
  protected http = inject(HttpClient);

  writingDocument$ = selectWritingDocument();

  getTemplateRequest$ = (action$: Observable<number>) => action$.pipe(
    switchMap(id => this.http.get<SiteDocument>(`${environment.siteDocsApi}/TemplateApi/GetDocumentTemplate`, {
      params: {
        id: id!.toString()
      }
    })),
    setWritingDocument()
  );

  getTemplatesRequest$ = () => this.http.get<SiteDocument[]>(`${environment.siteDocsApi}/TemplateApi/`).pipe(
    
  );

  submitDocument$ = (action$: Observable<SiteDocument>) => action$.pipe(
    switchMap(doc => this.http.post<number>(`${environment.siteDocsApi}/TemplateApi/UploadDocument`, doc))
  );
}