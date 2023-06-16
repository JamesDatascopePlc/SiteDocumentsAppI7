import { buildStore } from "src/app/shared/rxjs";
import { SiteDocument } from "./models";
import { memoize } from "lodash-es";

export const useSiteDocumentStore = memoize(() => buildStore<SiteDocument, "DocumentID">("Site-Document", "DocumentID"));