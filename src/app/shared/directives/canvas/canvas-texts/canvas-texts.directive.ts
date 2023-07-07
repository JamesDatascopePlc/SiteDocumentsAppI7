import { Directive, Input } from "@angular/core";

export type CanvasText = {
  text: string,
}

@Directive({
  selector: "canvas[texts]",
  standalone: true
})
export class CanvasTextsDirective {
  @Input()
  texts: CanvasText[] = [];

  ngAfterViewInit() {
    
  }
}
