import { Directive, Input } from "@angular/core";
import { Observable, Subscription, from, map, merge, mergeMap } from "rxjs";
import { useElement } from "src/app/shared/angular/element";
import { AngularDirective, withOnChanges, withOnInit } from "src/app/shared/lifecycles";

@Directive({
  selector: "canvas[src]",
  standalone: true
})
export class CanvasImageDirective extends AngularDirective(withOnInit, withOnChanges) {
  canvas = useElement<HTMLCanvasElement>();
  context = this.canvas.getContext("2d")!;

  @Input()
  src: string = "";
  image$: Observable<HTMLImageElement> = merge(this.init(), this.input("src")).pipe(
    map(() => new Promise<HTMLImageElement>(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = this.src;
    })),
    mergeMap(promise => from(promise))
  );

  effects: Subscription[] = [
    this.image$.subscribe(img => {
      const parent = this.canvas.parentElement!;

      const ratio = img.width / img.height;
      const height = parent.offsetWidth / ratio;

      this.canvas.width = (height * ratio);
      this.canvas.height = (height > parent.offsetHeight 
        ? parent.offsetHeight
        : height) - 2;
        
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    })
  ]
}
