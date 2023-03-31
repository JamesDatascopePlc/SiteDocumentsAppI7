import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { BarcodeScanner, ScanOptions } from "@capacitor-community/barcode-scanner";

@Directive({
  selector: "[barcode-scanner]",
  standalone: true
})
export class BarcodeScannerDirective {
  @Input("barcode-scanner")
  options: ScanOptions = {}

  @Output("scan") 
  scan = new EventEmitter<string>();

  @HostListener("click")
  async scanCode() {
    await BarcodeScanner.hideBackground();
    const res = await BarcodeScanner.startScan({ targetedFormats: [] });
    
    if (res.hasContent)
      this.scan.emit(res.content);
  }
}
