import { CdkVirtualForOf, CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "virtual-scroll",
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" minBufferPx="1200" maxBufferPx="1200">
      <ng-content>
      </ng-content>
    </cdk-virtual-scroll-viewport>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf
  ]
})
export class VirtualScrollComponent {}