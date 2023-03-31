import { ActionerSelectComponent } from "./actioner-select/actioner-select.component";
import { CompanyActionerSelectComponent } from "./company-actioner-select/company-actioner-select.component";
import { QueueDurationComponent } from "./queue-duration/queue-duration.component";
import { QueueSelectComponent } from "./queue-select/queue-select.component";
import { RemainAnonymousComponent } from "./remain-anonymous/remain-anonymous.component";

export function importInputTypes() {
  return [
    ActionerSelectComponent,
    CompanyActionerSelectComponent,
    QueueDurationComponent,
    QueueSelectComponent,
    RemainAnonymousComponent
  ];
}