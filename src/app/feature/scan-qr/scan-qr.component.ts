import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent  implements OnInit,ViewWillEnter,ViewDidLeave {
  scannedQRResult: any;
  content_visibility:any;
  constructor(private alertController: AlertController, private router:Router) { }
  ionViewWillEnter(): void {
   this.startScanning();
  }

  ngOnInit() {}

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      this.alertMessage();
      return false;
    } catch (e) {
      this.alertMessage();
      return false;
    }
  }

  async startScanning(){
     try {
      const permission = await this.checkPermission();
      if (!permission) {
        this.alertMessage();
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedQRResult = result.content;
        console.log(this.scannedQRResult);
      }
    } catch (e) {
      console.log(e);
      this.alertMessage();
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  ionViewDidLeave(): void {
    this.stopScan();
  }
  async alertMessage(){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Permission Needed!',
      buttons: ['OK'],
    });
    this.router.navigate(['/dashboard/qr'])
    await alert.present();
  }
}
