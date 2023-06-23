import { ActionerSelectSummaryComponent } from "./actioner-select/summary/actioner-select-summary.component";
import { CategoryActionerSelectSummaryComponent } from "./category-actioner-select/summary/category-actioner-select-summary.component";
import { CompanyActionerSelectSummaryComponent } from "./company-actioner-select/summary/company-actioner-select-summary.component";
import { QueueDurationSummaryComponent } from "./queue-duration/summary/queue-duration-summary.component";
import { QueueSelectSummaryComponent } from "./queue-select/summary/queue-select-summary.component";
import { RemainAnonymousSummaryComponent } from "./remain-anonymous/summary/remain-anonymous-summary.component";
import { ResponsibilityAreaSelectSummaryComponent } from "./responsibility-area-select/summary/responsibility-area-select-summary.component";
import { SiteSelectSummaryComponent } from "./site-select/summary/site-select-summary.component";

export function importInputSummaries() {
  return [
    ActionerSelectSummaryComponent,
    CategoryActionerSelectSummaryComponent,
    CompanyActionerSelectSummaryComponent,
    QueueDurationSummaryComponent,
    QueueSelectSummaryComponent,
    RemainAnonymousSummaryComponent,
    ResponsibilityAreaSelectSummaryComponent,
    SiteSelectSummaryComponent
  ]
}