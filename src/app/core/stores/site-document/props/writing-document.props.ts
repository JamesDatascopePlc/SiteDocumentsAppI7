import { Store, propsFactory } from "@ngneat/elf";
import { pipeTap } from "src/app/shared/rxjs";
import { SiteDocument } from "../site-document.store";

const {
  withWritingDocument,
  selectWritingDocument,
  setWritingDocument,
} = propsFactory("writingDocument", { initialValue: null as SiteDocument | null });

export { withWritingDocument }

export function writingDocumentActions<T>(store: Store<{ name: string, state: { writingDocument: SiteDocument | null }, config: T }>) {
  return {
    selectWritingDocument: () => store.pipe(selectWritingDocument()),
    setWritingDocument: pipeTap<SiteDocument>(template => store.update(setWritingDocument(template)))
  }
}