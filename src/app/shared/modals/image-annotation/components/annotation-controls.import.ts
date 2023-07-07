import { BrushControlsComponent } from "./brush-controls/brush-controls.component";
import { TextControlsComponent } from "./text-controls/text-controls.component";

export function importAnnotationControls() {
  return [
    BrushControlsComponent,
    TextControlsComponent
  ]
}