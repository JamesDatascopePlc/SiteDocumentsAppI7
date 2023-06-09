import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { TargetEvent } from "../../models/events/target-event.model";
import { DataUrlFile } from "../../models/files/data-url-file.model";

function fileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}

function fileToDataUrlFile(file: File): Promise<DataUrlFile> {
  const reader = fileReader();
  return new Promise(resolve => {
    reader.onload = (event) => resolve({ 
      name: file.name, 
      lastModified: file.lastModified, 
      size: file.size, 
      type: file.type, 
      dataUrl: event.target!.result as string 
    })//resolve(event.target!.result as string);
    reader.readAsDataURL(file);
  });
}

@Component({
  selector: "upload",
  styles: [`
    :host { display: contents }
  `],
  template: `
    <label [for]="id" class="w-full h-full fixed cursor-pointer z-50"></label>
    <input [id]="id" type="file" [accept]="accept" [multiple]="multiple" (change)="take($event)" class="hidden" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  id = crypto.randomUUID();

  @Input()
  accept?: string;

  @Input()
  multiple: boolean = false;

  @Output()
  uploadFiles = new EventEmitter<DataUrlFile[]>();

  async take(ev: unknown) {
    const event = ev as TargetEvent<{ files: File[], value: null }>;
    const files: File[] = [...event.target.files];

    const dataUrlFiles = await Promise.all(files.map(fileToDataUrlFile));
    this.uploadFiles.emit(dataUrlFiles);
    event.target.value = null;
  }
}
