import { PreambleComponent } from "./preamble/preamble.component";
import { RequireGpsComponent } from "./require-gps/require-gps.component";
import { SiteBannerComponent } from "./site-banner/site-banner.component";

export function importInfoTypes() {
  return [
    PreambleComponent,
    RequireGpsComponent, 
    SiteBannerComponent
  ]
}