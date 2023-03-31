import { LetModule } from "@rx-angular/template/let";
import { ForModule } from "@rx-angular/template/for"
import { IfModule } from "@rx-angular/template/if";
import { UnpatchModule } from "@rx-angular/template/unpatch";
import { PushModule } from "@rx-angular/template/push";

export function importRxTemplate() {
  return [
    LetModule,
    ForModule,
    IfModule,
    UnpatchModule,
    PushModule
  ]
}