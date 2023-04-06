import { Store, StoreDef, propsFactory } from "@ngneat/elf";
import { SiteDocument } from "../site-document.store";
import { pipeTap } from "src/app/shared/rxjs";

const {
  withWritingDocument,
  selectWritingDocument,
  setWritingDocument,
} = propsFactory("writingDocument", { initialValue: null as SiteDocument | null });

export { withWritingDocument }

export function writingDocumentAdapter(store: Store<StoreDef>) {
  return {
    selectWritingDocument: () => store.pipe(selectWritingDocument()),
    setWritingDocument: pipeTap<SiteDocument>(template => store.update(setWritingDocument(template)))
  }
}