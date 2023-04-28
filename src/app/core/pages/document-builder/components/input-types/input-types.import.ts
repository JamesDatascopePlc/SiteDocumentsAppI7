import { ActionerSelectComponent } from "./actioner-select/actioner-select.component";
import { CategoryActionerSelectComponent } from "./category-actioner-select/category-actioner-select.component";
import { CompanyActionerSelectComponent } from "./company-actioner-select/company-actioner-select.component";
import { DocumentImageUploadComponent } from "./document-image-upload/document-image-upload.component";
import { QueueDurationComponent } from "./queue-duration/queue-duration.component";
import { QueueSelectComponent } from "./queue-select/queue-select.component";
import { RemainAnonymousComponent } from "./remain-anonymous/remain-anonymous.component";
import { ResponsibilityAreaSelectComponent } from "./responsibility-area-select/responsibility-area-select.component";
import { SiteSelectComponent } from "./site-select/site-select.component";

export function importInputTypes() {
  return [
    ActionerSelectComponent,
    CategoryActionerSelectComponent,
    CompanyActionerSelectComponent,
    DocumentImageUploadComponent,
    QueueDurationComponent,
    QueueSelectComponent,
    RemainAnonymousComponent,
    ResponsibilityAreaSelectComponent,
    SiteSelectComponent
  ];
}