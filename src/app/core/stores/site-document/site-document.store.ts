import { SiteDocument } from "./models";
import { memoize } from "lodash-es";
import { store } from "src/app/shared/rxjs";

export const useSiteDocumentStore = memoize(() => store<SiteDocument, "DocumentID">("Site-Document", "DocumentID"));