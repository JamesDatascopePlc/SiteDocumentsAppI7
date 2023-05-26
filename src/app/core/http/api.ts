import { Injectable, inject } from "@angular/core";
import { AssetApi } from "./asset.api";
import { TemplateApi } from "./template.api";

@Injectable({
  providedIn: "root"
})
export class Api {
  asset = inject(AssetApi);
  template = inject(TemplateApi);
}