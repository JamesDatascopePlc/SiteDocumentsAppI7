import { Directive, HostListener, Input, inject } from "@angular/core";
import { Router } from "@angular/router";

@Directive({
  selector: "[navigate]",
  standalone: true
})
export class NavigateDirective {
  route = inject(Router);

  @Input()
  navigate: string = "";

  @HostListener("click")
  navigateTo() {
    this.route.navigateByUrl(this.navigate);
  }
}
