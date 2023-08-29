import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent  implements OnInit, OnDestroy {
  isSupported = false;
  scannedQRResult: any;
  constructor() { }

  ngOnInit() {
    // this.startScan();
  }

  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('scanner-active');
    const result: any = await BarcodeScanner.startScan();
    BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    if (result.hasContent) {
      this.scannedQRResult = result.content;
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  ngOnDestroy(): void {this.stopScan()}
}
