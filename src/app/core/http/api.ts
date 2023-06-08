import { Injectable, inject } from "@angular/core";
import { TemplateApi } from "./template.api";

@Injectable({
  providedIn: "root"
})
export class Api {
  template = inject(TemplateApi);
}