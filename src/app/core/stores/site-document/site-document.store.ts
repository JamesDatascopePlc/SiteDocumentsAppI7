import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { selectAllEntities, withEntities } from "@ngneat/elf-entities";
import { SiteDocument } from "./models";

const store = createStore(
  { name: "site-documents" },
  withEntities<SiteDocument, "DocumentID">({ idKey: "DocumentID" })
);

@Injectable({ providedIn: "root" })
export class SiteDocumentStore {
  templates$ = store.pipe(selectAllEntities());
}