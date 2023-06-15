import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Page } from "src/app/core/stores/site-document/models";

@Component({
  selector: "document-navigation",
  styles: [`
    :host { display: contents }
  `],
  template: `
    <ion-button 
      [hidden]="index === 1"
      (click)="back()"
      class="float-left"
      fill="clear">
      <ion-icon name="arrow-back-outline" />
    </ion-button>
    <ion-button 
      [hidden]="index === max"
      (click)="next()"
      class="float-right"
      fill="clear">
      <ion-icon name="arrow-forward-outline" />
    </ion-button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class DocumentNavigationComponent {
  @Input({ required: true })
  pages!: Page[];

  @Input({ required: true })
  index!: number;

  @Output()
  indexChange = new EventEmitter<number>();

  get max() {
    return this.pages
      .filter(p => !p.Hidden)
      .last()
      ?.PageNo
      || 1;
  }

  back() {
    const prevPage = this.pages
      .filter(p => !p.Hidden && p.PageNo < this.index)
      .last();

    this.index = prevPage!.PageNo;
    this.indexChange.emit(this.index);
  }

  next() {
    const nextPage = this.pages
      .filter(p => !p.Hidden && p.PageNo > this.index)
      .first();

    this.index = nextPage!.PageNo;
    this.indexChange.emit(this.index);
  }
}
