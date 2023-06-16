import { SiteDocumentImage } from "../site-document/models/site-document.model";
import { memoize } from "lodash-es";
import { buildStore } from "src/app/shared/rxjs";

export const useDocumentImageStore = memoize(() => buildStore<SiteDocumentImage>("document-images", "Id"));