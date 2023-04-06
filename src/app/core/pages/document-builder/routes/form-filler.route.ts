import { Injectable, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs";

@Injectable({ providedIn: "root" })
export class FormFillerRoute {
  protected route = inject(ActivatedRoute); 

  documentIds$ = this.route.queryParams.pipe(
    map(params => JSON.parse(params["ids"]) as number[])
  );

  lastDocumentId$ = this.documentIds$.pipe(
    map(ids => ids[ids.length - 1] || 0),
    filter(id => id > 0)
  );
}